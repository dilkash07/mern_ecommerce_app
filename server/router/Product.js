const express = require("express");
const router = express.Router();

const {
  uploadProduct,
  getSingleProduct,
  getAllProduct,
} = require("../controllers/Product");
const { searchProduct } = require("../controllers/SearchProduct");

router.post("/uploadProduct", uploadProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getSingleProduct/:id", getSingleProduct);
router.get("/getSearchProduct", searchProduct);

module.exports = router;
