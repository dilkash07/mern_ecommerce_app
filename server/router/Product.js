const express = require("express");
const router = express.Router();

const { uploadProduct, getSingleProduct } = require("../controllers/Product");

router.post("/uploadProduct", uploadProduct);
router.get("/getSingleProduct/:id", getSingleProduct);

module.exports = router;
