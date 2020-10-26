const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const eventController = require("../controllers/event");

// [POST] : /v1/event/post
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

// [GET] : /v1/event/posts
router.get("/posts", eventController.getAllEventPost);

// [GET BY ID] : /v1/event/post/:postId
router.get("/post/:postId", eventController.getEventPostById);

// [PUT] : /v1/event/post/:postId
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

// [DELETE] : /v1/event/post/:postId
router.delete("/post/:postId", eventController.deleteEventPost);

module.exports = router;
