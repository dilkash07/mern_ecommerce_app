const express = require("express");
const router = express.Router();

const {
  getAllProduct,
  getProductCategory,
  getRecommendedProduct,
  getProductDetails,
} = require("../controllers/Product");

const { getFilteredProduct } = require("../controllers/FilteredProduct");
const { addReviews } = require("../controllers/Review");
const { auth } = require("../middleware/Auth");

router.post("/addReviews", auth, addReviews);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductCategory", getProductCategory);
router.get("/getProductDetails/:id", getProductDetails);
router.get("/getFilteredProduct", getFilteredProduct);
router.post("/getRecommendedProduct", getRecommendedProduct);

module.exports = router;
