const Message = require("../models/chat");
const path = require("path");
const fs = require("fs");

exports.postChat = (req, res, next) => {
  const chatID = req.body.chatID;
  const allChat = req.body.allChat;
  const dateChat = req.body.dateChat;
  const chatText = req.body.chatText;
  const sendBy = req.body.sendBy;
  const chatDate = req.body.chatDate;
  const chatContent = req.body.chatContent;

  const Send = new Message({
    chatID: chatID,
    allChat: allChat,
    dateChat: dateChat,
    chatText: chatText,
    sendBy: sendBy,
    chatDate: chatDate,
    chatContent: chatContent,
  });

  Send.save()
    .then((result) => {
      res.status(201).json({ message: "Send Message Success", data: result });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllDataChat = (req, res, next) => {
  Message.find()
    .then((result) => {
      res.status(200).json({
        message: "Render data success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getSpecificDataChat = (req, res, next) => {
  const chatId = req.params.chatId;
  Message.find({ chatID: chatId })
    .then((result) => {
      if (!result) {
        console.log("id : ", chatId);
        const error = new Error("Chat History doesnt found!");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Chat History founded",
        data: result,
      });
    })
    .catch((err) => next(err));
};
exports.getDataChatById = (req, res, next) => {
  const idRootChat = req.params.idRootChat;
  Message.findById(idRootChat)
    .then((result) => {
      if (!result) {
        console.log("id : ", chatId);
        const error = new Error("Chat History doesnt found!");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Chat History founded",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.deleteDataChat = (req, res, next) => {
  const chatId = req.params.chatId;

  Message.findById(chatId)
    .then((post) => {
      if (!post) {
        const error = new Error("Data not found!");
        error.errorStatus = 404;
        throw error;
      }
      return Message.findByIdAndRemove(chatId);
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
