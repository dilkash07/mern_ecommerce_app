const express = require("express");
const router = express.Router();

const { auth, admin } = require("../middleware/Auth");

const {
  getUsers,
  updateOrderStatus,
  getOrders,
  getProducts,
  uploadProductCategory,
  uploadProduct,
  updateProduct,
  getOrdersAndRevenue,
  updateUser,
} = require("../controllers/Admin");

router.get("/get-users", auth, admin, getUsers);
router.put("/update-user/:id", auth, admin, updateUser);
router.get("/get-orders", auth, admin, getOrders);
router.get("/get-orders-and-revenue", getOrdersAndRevenue);
router.get("/get-products", auth, admin, getProducts);
router.post("/upload-product", auth, admin, uploadProduct);
router.put("/update-product/:id", auth, admin, updateProduct);
router.post("/upload-product-category", auth, admin, uploadProductCategory);
router.put("/update-order-status/:id", auth, admin, updateOrderStatus);

module.exports = router;
