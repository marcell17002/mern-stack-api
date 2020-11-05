const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const eventController = require("../controllers/event");
const verifyToken = require("../controllers/verifyToken");

router.post(
  "/post",
  [
    body("tittle")
      .isLength({ min: 5 })
      .withMessage("Input tittle min. 5 character"),
    body("desc")
      .isLength({ min: 50 })
      .withMessage("Input desc min. 50 character"),
  ],
  eventController.createEventPost
);
router.get("/posts", verifyToken, eventController.getAllEventPost);
router.get("/post/:postId", eventController.getEventPostById);
router.put(
  "/post/:postId",
  [
    body("tittle")
      .isLength({ min: 5 })
      .withMessage("Input tittle min. 5 character"),
    body("desc")
      .isLength({ min: 50 })
      .withMessage("Input desc min. 50 character"),
  ],
  eventController.updateEventPost
);
router.delete("/post/:postId", eventController.deleteEventPost);

module.exports = router;
