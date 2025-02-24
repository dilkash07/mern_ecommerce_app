const express = require("express");
const router = express.Router();

const {
  getAllProduct,
  getProductCategory,
  getRecommendedProduct,
  getFilteredProduct,
  getProductDetails,
} = require("../controllers/Product");

const { addReviews } = require("../controllers/Review");
const { auth } = require("../middleware/Auth");

router.post("/add-reviews", auth, addReviews);
router.get("/get-all-product", getAllProduct);
router.get("/get-product-category", getProductCategory);
router.get("/get-product-details/:id", getProductDetails);
router.get("/get-filtered-product", getFilteredProduct);
router.post("/get-recommended-product", getRecommendedProduct);

module.exports = router;
