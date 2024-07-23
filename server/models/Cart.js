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
    trim: true,
  },
  discountOnMrp: {
    type: Number,
    required: true,
    default: 0,
    trim: true,
  },
  couponDiscount: {
    type: Number,
    required: true,
    default: 0,
    trim: true,
  },
  shippingFee: {
    type: Number,
    required: true,
    default: 0,
    trim: true,
  },
  convinienceCharge: {
    type: Number,
    required: true,
    default: 0,
    trim: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
    trim: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
