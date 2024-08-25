const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const { newOrder } = require("../controllers/Order");

router.post("/newOrder", auth, newOrder);

module.exports = router;
