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

router.post("/add-address", auth, addAddress);
router.get("/get-address", auth, getAddress);
router.delete("/remove-address", auth, removeAddress);
router.put("/update-address", auth, updateAddress);
router.put("/make-default-address", auth, makeDefaultAddress);

module.exports = router;
