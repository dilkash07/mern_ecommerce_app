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
        type: String,
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
        default: "pending",
      },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "card"],
    },
    paidAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    deliverdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
