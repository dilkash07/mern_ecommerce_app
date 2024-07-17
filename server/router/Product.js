const express = require("express");
const router = express.Router();

const {
  uploadProduct,
  getAllProduct,
  getRecommendedProduct,
  getProductDetails,
} = require("../controllers/Product");

const { getFilteredProduct } = require("../controllers/FilteredProduct");
const {
  uploadProductCategory,
  getProductCategory,
} = require("../controllers/Category");
const { addReviews } = require("../controllers/Review");
const { auth } = require("../middleware/Auth");

router.post("/uploadProduct", uploadProduct);
router.post("/uploadProductCategory", uploadProductCategory);
router.post("/addReviews", auth, addReviews);
router.get("/getProductCategory", getProductCategory);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductDetails/:id", getProductDetails);
router.get("/getFilteredProduct", getFilteredProduct);
router.post("/getRecommendedProduct", getRecommendedProduct);

module.exports = router;
