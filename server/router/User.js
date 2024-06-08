const express = require("express");
const router = express.Router();
const { signup, login, sendOtp } = require("../controllers/Auth");

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// send opt
router.post("/sendotp", sendOtp);

module.exports = router;
