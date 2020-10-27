const { validationResult } = require("express-validator");
const Authentication = require("../models/auth");
const path = require("path");
const fs = require("fs");

exports.createUser = (req, res, next) => {
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

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const image = req.file.path;

  const AddingUser = new Authentication({
    name: name,
    email: email,
    image: image,
    password: password,
  });

  AddingUser.save()
    .then((result) => {
      res.status(201).json({ message: "Create User Success", data: result });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllUsers = (req, res, next) => {
  Authentication.find()
    .then((result) => {
      res.status(200).json({
        message: "Render data user success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getUserById = (req, res, next) => {
  const userId = req.params.userId;

  Authentication.findById(userId)
    .then((result) => {
      if (!result) {
        const error = new Error("User doesnt found!");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "User has been founded",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateUser = (req, res, next) => {
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

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const image = req.file.path;
  const userId = req.params.userId;

  Authentication.findById(userId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data not found");
        error.errorStatus = 404;
        throw err;
      }
      post.name = name;
      post.email = email;
      post.password = password;
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

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  Authentication.findById(userId)
    .then((post) => {
      if (!post) {
        const error = new Error("Data not found!");
        error.errorStatus = 404;
        throw error;
      }
      removeImage(post.image);
      return Authentication.findByIdAndRemove(userId);
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
  console.log("filepath : ", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};