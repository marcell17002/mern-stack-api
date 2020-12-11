const express = require("express");

const router = express.Router();

const historyController = require("../controllers/history");
const verifyToken = require("../controllers/verifyToken");

router.post("/post", verifyToken, historyController.creteHistoryChat);
router.get("/posts", verifyToken, historyController.getAllHistoryChat);
router.get(
  "/posts/:variable/:valueData",
  verifyToken,
  historyController.getSpecificHistoryChat
);
router.put("/post/:idChat", verifyToken, historyController.updateHistoryChat);

module.exports = router;
