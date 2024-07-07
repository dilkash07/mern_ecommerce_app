const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const { addCart, removeCart, getCartDetails } = require("../controllers/Cart");

router.post("/addCart", addCart);
router.delete("/removeCart", removeCart);
router.get("/getCartDetails", auth, getCartDetails);

module.exports = router;
