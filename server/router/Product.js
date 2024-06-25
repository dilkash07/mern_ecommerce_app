const express = require("express");
const router = express.Router();

const {
  uploadProduct,
  getSingleProduct,
  getAllProduct,
} = require("../controllers/Product");

const { searchProduct } = require("../controllers/SearchProduct");

const { addWishlist, removeWishlist } = require("../controllers/Wishlist");

router.post("/uploadProduct", uploadProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getSingleProduct/:id", getSingleProduct);
router.get("/getSearchProduct", searchProduct);

// wishlist
router.put("/addWishlist", addWishlist);
router.put("/removeWishlist", removeWishlist);

module.exports = router;
