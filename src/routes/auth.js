const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth");
const verifyToken = require("../controllers/verifyToken");

//creating user
router.post(
  "/user",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Input password min. 6 character"),
  ],
  authController.createUser
);
router.get("/users", verifyToken, authController.getAllUsers);
router.get("/user/:userId", verifyToken, authController.getUserById);
router.put("/user/:userId", verifyToken, authController.updateUser);
router.delete("/user/:userId", verifyToken, authController.deleteUser);

//authentication
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
module.exports = router;
