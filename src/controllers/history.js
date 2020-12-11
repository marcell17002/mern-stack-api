const History = require("../models/history");
const { validationResult } = require("express-validator");

exports.creteHistoryChat = (req, res, next) => {
  const chatId = req.body.chatId;
  const lastChat = req.body.lastChat;
  const lastDate = req.body.lastDate;
  const idSender = req.body.idSender;
  const idReceiver = req.body.idReceiver;

  const Send = new History({
    chatId: chatId,
    lastChat: lastChat,
    lastDate: lastDate,
    idSender: idSender,
    idReceiver: idReceiver,
  });

  Send.save()
    .then((result) => {
      res.status(201).json({ message: "Create history Success", data: result });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllHistoryChat = (req, res, next) => {
  History.find()
    .then((result) => {
      res.status(200).json({
        message: "Render data success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getSpecificHistoryChat = (req, res, next) => {
  const variable = req.params.variable;
  const valueData = req.params.valueData;

  History.find({ [variable]: [valueData] })
    .then((result) => {
      if (!result) {
        console.log("id : ", chatId);
        const error = new Error("Chat History doesnt found!");
        error.errorStatus = 404;
        throw error;
      }

      console.log("variable:", req.params.variable);
      console.log("valueData:", req.params.valueData);
      res.status(200).json({
        message: "Chat History founded",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateHistoryChat = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const chatId = req.body.chatId;
  const lastChat = req.body.lastChat;
  const lastDate = req.body.lastDate;
  const idSender = req.body.idSender;
  const idReceiver = req.body.idReceiver;
  const idChat = req.params.idChat;

  History.findById(idChat)
    .then((post) => {
      if (!post) {
        const err = new Error("Data not found");
        error.errorStatus = 404;
        throw err;
      }
      post.chatId = chatId;
      post.lastChat = lastChat;
      post.lastDate = lastDate;
      post.idSender = idSender;
      post.idReceiver = idReceiver;

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
