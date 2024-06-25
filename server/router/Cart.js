const express = require("express");
const router = express.Router();

const {
  addCart,
  removeCart,
  getCartDetails,
  getWishlist,
} = require("../controllers/Cart");

router.post("/addCart", addCart);
router.delete("/removeCart", removeCart);
router.get("/getCartDetails", getCartDetails);
router.get("/getwishlist", getWishlist);

module.exports = router;
