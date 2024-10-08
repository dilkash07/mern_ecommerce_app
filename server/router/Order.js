const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const { newOrder, getOrder, getOrderDetails } = require("../controllers/Order");

router.post("/newOrder", auth, newOrder);
router.get("/getOrder", auth, getOrder);
router.get("/getOrderDetails/:id", getOrderDetails);

module.exports = router;
