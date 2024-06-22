const express = require("express");
const router = express.Router();

const {
  uploadProduct,
  getSingleProduct,
  getAllProduct,
} = require("../controllers/Product");

const { searchProduct } = require("../controllers/SearchProduct");
const { addCart, removeCart, getCartDetails } = require("../controllers/Cart");
const { addWishlist, removeWishlist } = require("../controllers/Wishlist");

router.post("/uploadProduct", uploadProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getSingleProduct/:id", getSingleProduct);
router.get("/getSearchProduct", searchProduct);

// cart
router.post("/addCart", addCart);
router.delete("/removeCart", removeCart);
router.get("/getCart", getCartDetails);

// wishlist
router.put("/addWishlist", addWishlist);
router.put("/removeWishlist", removeWishlist);

module.exports = router;
