const { validationResult } = require("express-validator");
const EventPost = require("../models/event");
const path = require("path");
const fs = require("fs");

exports.createEventPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  if (!req.file) {
    const err = new Error("Image belum ter-upload");
    err.errorStatus = 422;
    throw err;
  }

  const tittle = req.body.tittle;
  const category = req.body.category;
  const desc = req.body.desc;
  const author = req.body.author;
  const image = req.file.path;

  const Posting = new EventPost({
    tittle: tittle,
    category: category,
    image: image,
    desc: desc,
    author: author,
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({ message: "Create Event Success", data: result });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllEventPost = (req, res, next) => {
  EventPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Render data success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getEventPostById = (req, res, next) => {
  const postId = req.params.postId;
  EventPost.findById(postId)
    .then((result) => {
      if (!result) {
        console.log("id : ", postId);
        const error = new Error("Event post doesnt found!");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Event post by id founded",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateEventPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  if (!req.file) {
    const err = new Error("Image doesnt uploaded");
    err.errorStatus = 422;
    throw err;
  }

  const tittle = req.body.tittle;
  const category = req.body.category;
  const desc = req.body.desc;
  const author = req.body.author;
  const image = req.file.path;
  const postId = req.params.postId;

  EventPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data not found");
        error.errorStatus = 404;
        throw err;
      }
      post.tittle = tittle;
      post.category = category;
      post.desc = desc;
      post.author = author;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been updated!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteEventPost = (req, res, next) => {
  const postId = req.params.postId;

  EventPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Data not found!");
        error.errorStatus = 404;
        throw error;
      }
      removeImage(post.image);
      return EventPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been deleted!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  console.log("filePath :", filePath);
  console.log("dirname :", __dirname);

  filePath = path.join(__dirname, "../..", filePath);
  console.log("filePath new : ", filePath);
  fs.unlink(filePath, (err) => console.log("error delete : ", err));
};
