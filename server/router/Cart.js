const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const {
  addCart,
  removeCart,
  getCartDetails,
  moveToCart,
} = require("../controllers/Cart");

router.post("/add-cart", auth, addCart);
router.delete("/remove-cart", auth, removeCart);
router.get("/get-cart-details", auth, getCartDetails);
router.put("/move-to-cart", auth, moveToCart);

module.exports = router;
