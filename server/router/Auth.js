const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  sendOtp,
  changePassword,
  deleteAccount,
} = require("../controllers/Auth");

const { auth } = require("../middleware/Auth");

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// send opt
router.post("/sendotp", sendOtp);

// update password
router.put("/change-password", auth, changePassword);

// delete account
router.delete("/delete-account", auth, deleteAccount);

module.exports = router;
