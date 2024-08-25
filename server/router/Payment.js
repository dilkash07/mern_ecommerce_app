const express = require("express");
const { processPayment } = require("../controllers/Payment");
const router = express.Router();

router.post("/processPayment", processPayment);

module.exports = router;
