const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
  newOrder,
  getOrder,
  getOrderDetails,
  getOrders,
  updateOrderStatus,
} = require("../controllers/Order");

router.post("/newOrder", auth, newOrder);
router.get("/getOrder", auth, getOrder);
router.get("/getOrderDetails/:id", getOrderDetails);

// amdin panel order
router.get("/getOrders", getOrders);
router.put("/updateOrderStatus/:id", updateOrderStatus);

module.exports = router;
