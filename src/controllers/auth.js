const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const verifyToken = require("./verifyToken");
const Authentication = require("../models/auth");

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const nim = req.body.nim;
  const hashedPassword = bcrypt.hashSync(password, 6);

  const AddingUser = new Authentication({
    name: name,
    email: email,
    password: hashedPassword,
    nim: nim,
  });

  AddingUser.save()
    .then((result) => {
      var token = jwt.sign({ id: result._id }, config.secret, {
        expiresIn: 86400,
      });
      res
        .status(201)
        .send({ auth: true, token: token })
        .json({ message: "Create User Success", data: result });
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

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 6);
  const image = req.body.image;
  const nim = req.body.nim;

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
      post.password = hashedPassword;
      post.image = image;
      post.nim = nim;

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
      // removeImage(post.image);
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

exports.loginUser = (req, res, next) => {
  Authentication.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token, id: user._id });
  });
};

exports.logoutUser = (req, res, next) => {
  res.status(200).send({ auth: false, token: null, message: "Success Logout" });
};

const removeImage = (filePath) => {
  console.log("filePath :", filePath);
  console.log("dirname :", __dirname);

  filePath = path.join(__dirname, "../..", filePath);
  console.log("filepath : ", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
