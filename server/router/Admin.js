const express = require("express");
const router = express.Router();

const {
  getUsers,
  updateOrderStatus,
  getOrders,
  getProducts,
  uploadProductCategory,
  uploadProduct,
  updateProduct,
  getProductCategory,
} = require("../controllers/Admin");

router.get("/getUsers", getUsers);
router.get("/getOrders", getOrders);
router.get("/getProducts", getProducts);
router.post("/uploadProduct", uploadProduct);
router.put("/updateProduct/:id", updateProduct);
router.post("/uploadProductCategory", uploadProductCategory);
router.get("/getProductCategory", getProductCategory);
router.put("/updateOrderStatus/:id", updateOrderStatus);

module.exports = router;
