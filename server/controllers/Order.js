const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Address = require("../models/Address");

exports.newOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { shippingInfo, orderItem, paymentInfo, paymentMethod } = req.body;

    let response = [];

    for (let i = 0; i < orderItem.length; i++) {
      const order = await Order.create({
        user: id,
        shippingInfo,
        orderItem: orderItem[i],
        paymentInfo,
        paymentMethod,
      });
      response.push(order);
    }

    await Cart.findOneAndUpdate(
      { user: id },
      {
        items: [],
        totalMrp: 0,
        discountOnMrp: 0,
        couponDiscount: 0,
        shippingFee: 0,
        convinienceCharge: 0,
        totalAmount: 0,
      }
    );
    const address = await Address.findById(shippingInfo);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      response,
      shippingInfo: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating order",
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { id } = req.user;

    const response = (
      await Order.find({ user: id }).populate("user").exec()
    ).reverse();

    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching order details",
    });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Order.findById(id)
      .populate("user")
      .populate("orderItem.product")
      .exec();

    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching order details",
    });
  }
};
