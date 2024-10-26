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

router.get("/getUsers", auth, admin, getUsers);
router.put("/updateUser/:id", auth, admin, updateUser);
router.get("/getOrders", auth, admin, getOrders);
router.get("/getOrdersAndRevenue", getOrdersAndRevenue);
router.get("/getProducts", auth, admin, getProducts);
router.post("/uploadProduct", auth, admin, uploadProduct);
router.put("/updateProduct/:id", auth, admin, updateProduct);
router.post("/uploadProductCategory", auth, admin, uploadProductCategory);
router.put("/updateOrderStatus/:id", auth, admin, updateOrderStatus);

module.exports = router;
