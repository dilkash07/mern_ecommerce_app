const express = require("express");
const router = express.Router();

const { uploadProduct } = require("../controllers/Product");

router.post("/uploadProduct", uploadProduct);

module.exports = router;
