const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth");

router.post(
  "/user",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Input password min. 6 character"),
  ],
  authController.createUser
);

router.get("/users", authController.getAllUsers);
router.get("/user/:userId", authController.getUserById);
router.put("/user/:userId", authController.updateUser);
router.delete("/user/:userId", authController.deleteUser);

module.exports = router;
