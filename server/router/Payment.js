const express = require("express");
const { processPayment } = require("../controllers/Payment");
const router = express.Router();

router.post("/process-payment", processPayment);

module.exports = router;
