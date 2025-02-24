const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const {
  addWishlist,
  removeWishlist,
  getWishlistDetails,
  moveToWishlist,
} = require("../controllers/Wishlist");

router.post("/add-wishlist", auth, addWishlist);
router.delete("/remove-wishlist", auth, removeWishlist);
router.get("/get-wishlist-details", auth, getWishlistDetails);
router.put("/move-to-wishlist", auth, moveToWishlist);

module.exports = router;
