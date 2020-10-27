const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const profileController = require("../controllers/profile");

router.post(
  "/post",
  [
    body("pengalaman")
      .isLength({ min: 6 })
      .withMessage("Input judul min. 6 character"),
  ],
  profileController.createProfile
);

router.get("/posts", profileController.getAllDataProfile);
router.get("/post/:profileId", profileController.getDataProfileById);
router.put("/post/:profileId", profileController.updateProfile);
router.delete("/post/:profileId", profileController.deleteProfile);

module.exports = router;
