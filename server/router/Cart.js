const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const {
  addCart,
  removeCart,
  getCartDetails,
  moveToCart,
} = require("../controllers/Cart");

router.post("/addCart", auth, addCart);
router.delete("/removeCart", auth, removeCart);
router.get("/getCartDetails", auth, getCartDetails);
router.put("/moveToCart", auth, moveToCart);

module.exports = router;
