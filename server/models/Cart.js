const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
});

// cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [cartItemSchema],
  totalMrp: {
    type: Number,
    required: true,
    default: 0,
  },
  discountOnMrp: {
    type: Number,
    required: true,
    default: 0,
  },
  couponDiscount: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingFee: {
    type: Number,
    required: true,
    default: 0,
  },
  convinienceCharge: {
    type: Number,
    required: true,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
