const express = require("express");
const router = express.Router();

const {
  addWishlist,
  removeWishlist,
  getWishlist,
} = require("../controllers/Wishlist");

router.post("/addWishlist", addWishlist);
router.delete("/removeWishlist", removeWishlist);
router.get("/getWishlistDetails", getWishlist);

module.exports = router;
