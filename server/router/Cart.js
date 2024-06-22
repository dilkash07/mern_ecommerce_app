const express = require("express");
const router = express.Router();

const { addCart, removeCart, getCartDetails } = require("../controllers/Cart");

router.post("/addCart", addCart);
router.delete("/removeCart", removeCart);
router.get("/getCartDetails", getCartDetails);

module.exports = router;
