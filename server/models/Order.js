const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    shippingInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Address",
    },
    orderItem: {
      title: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
        required: true,
        default: "Pending",
      },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash", "Card"],
    },
    paidAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    orderStatus: {
      type: String,
      required: true,
      enum: [
        "Processing",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
