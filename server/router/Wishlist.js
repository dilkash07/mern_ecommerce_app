const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const {
  addWishlist,
  removeWishlist,
  getWishlistDetails,
} = require("../controllers/Wishlist");

router.post("/addWishlist", addWishlist);
router.delete("/removeWishlist", removeWishlist);
router.get("/getWishlistDetails", auth, getWishlistDetails);

module.exports = router;
