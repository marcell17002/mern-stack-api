const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const chatController = require("../controllers/chat");
const verifyToken = require("../controllers/verifyToken");

router.post("/post", verifyToken, chatController.postChat);
router.get("/posts", verifyToken, chatController.getAllDataChat);
router.get("/posts/:userId", verifyToken, chatController.getSpecificDataChat);
router.get("/post/:chatId", verifyToken, chatController.getDataChatById);
router.delete("/post/:chatId", verifyToken, chatController.deleteDataChat);

module.exports = router;
