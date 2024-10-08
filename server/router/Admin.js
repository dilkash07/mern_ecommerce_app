const express = require("express");
const router = express.Router();

const {
  getUsers,
  updateOrderStatus,
  getOrders,
  getProducts,
  uploadProductCategory,
  uploadProduct,
  getProductCategory,
} = require("../controllers/Admin");

router.get("/getUsers", getUsers);
router.get("/getOrders", getOrders);
router.get("/getProducts", getProducts);
router.post("/uploadProduct", uploadProduct);
router.post("/uploadProductCategory", uploadProductCategory);
router.get("/getProductCategory", getProductCategory);
router.put("/updateOrderStatus/:id", updateOrderStatus);

module.exports = router;
