const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const chatController = require("../controllers/chat");

router.post("/post", chatController.postChat);
router.get("/posts", chatController.getAllDataChat);
router.get("/post/:chatId", chatController.getDataChatById);
router.delete("/post/:chatId", chatController.deleteDataChat);

module.exports = router;
