const { validationResult } = require("express-validator");
const EventPost = require("../models/event");

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
