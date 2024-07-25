const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
  addAddress,
  getAddress,
  removeAddress,
  updateAddress,
  makeDefaultAddress,
} = require("../controllers/Address");

router.post("/addAddress", auth, addAddress);
router.get("/getAddress", auth, getAddress);
router.delete("/removeAddress", auth, removeAddress);
router.put("/updateAddress", auth, updateAddress);
router.put("/makeDefaultAddress", auth, makeDefaultAddress);

module.exports = router;
