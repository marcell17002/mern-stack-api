const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const profileController = require("../controllers/profile");
const verifyToken = require("../controllers/verifyToken");

router.post(
  "/post",
  [
    body("pengalaman")
      .isLength({ min: 6 })
      .withMessage("Input judul min. 6 character"),
  ],
  verifyToken,
  profileController.createProfile
);
router.get("/posts", verifyToken, profileController.getAllDataProfile);
router.get(
  "/posts/:idPemilik",
  verifyToken,
  profileController.getSpecificDataProfile
);
router.get(
  "/post/:profileId",
  verifyToken,
  profileController.getDataProfileById
);
router.put("/post/:profileId", verifyToken, profileController.updateProfile);
router.delete("/post/:profileId", verifyToken, profileController.deleteProfile);

module.exports = router;
