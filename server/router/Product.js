const express = require("express");
const router = express.Router();

const {
  uploadProduct,
  getSingleProduct,
  getAllProduct,
} = require("../controllers/Product");

const { getFilteredProduct } = require("../controllers/FilteredProduct");

router.post("/uploadProduct", uploadProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getSingleProduct/:id", getSingleProduct);
router.get("/getFilteredProduct", getFilteredProduct);

module.exports = router;
