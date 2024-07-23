const express = require("express");
const router = express.Router();

const {
  getUserDetails,
  updateProfilePricture,
  updateProfile,
} = require("../controllers/Profile");
const { auth } = require("../middleware/Auth");

router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateProfilePicture", auth, updateProfilePricture);
router.put("/updateProfile", auth, updateProfile);

module.exports = router;
