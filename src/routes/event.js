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

// router.get('/event',())
// router.put'/event',())
// router.delete('/event',())

module.exports = router;
