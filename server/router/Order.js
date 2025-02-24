const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const { newOrder, getOrder, getOrderDetails } = require("../controllers/Order");

router.post("/new-order", auth, newOrder);
router.get("/get-order", auth, getOrder);
router.get("/get-order-details/:id", getOrderDetails);

module.exports = router;
