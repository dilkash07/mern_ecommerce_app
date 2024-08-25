const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const {
  addWishlist,
  removeWishlist,
  getWishlistDetails,
  moveToWishlist,
} = require("../controllers/Wishlist");

router.post("/addWishlist", auth, addWishlist);
router.delete("/removeWishlist", auth, removeWishlist);
router.get("/getWishlistDetails", auth, getWishlistDetails);
router.put("/moveToWishlist", auth, moveToWishlist);

module.exports = router;
