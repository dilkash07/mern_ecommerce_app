const express = require("express");
const router = express.Router();

const {
  getUserDetails,
  updateProfilePricture,
  updateProfile,
} = require("../controllers/Profile");
const { auth } = require("../middleware/Auth");

router.get("/get-user-details", auth, getUserDetails);
router.put("/update-profile-picture", auth, updateProfilePricture);
router.put("/update-profile", auth, updateProfile);

module.exports = router;
