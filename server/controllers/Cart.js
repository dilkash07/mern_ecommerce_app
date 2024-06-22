const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");

// add to cart product
exports.addCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
          sellingPrice: product.sellingPrice,
        });
      }

      // calculate total mrp
      cart.totalMrp = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      // calculate discount on mrp
      cart.discountOnMrp = cart.items.reduce(
        (acc, item) => acc + item.quantity * (item.price - item.sellingPrice),
        0
      );

      // calculate total amount
      cart.totalAmount = cart.items.reduce(
        (acc, item) =>
          acc + item.quantity * (item.price - (item.price - item.sellingPrice)),
        0
      );

      await cart.save();
    } else {
      const newCart = new Cart({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
            price: product.price,
            sellingPrice: product.sellingPrice,
          },
        ],
        totalMrp: product.price * quantity,
        discountOnMrp: (product.price - product.sellingPrice) * quantity,
        totalAmount:
          (product.price - (product.price - product.sellingPrice)) * quantity,

        // remaining coupon discount, shipping fee and convinience charge
      });
      await newCart.save();
    }
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding cart",
    });
  }
};

// remove from cart product
exports.removeCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    cart.items.splice(itemIndex, 1);

    // calculate total mrp
    cart.totalMrp = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // calculate total discount on mrp
    cart.discountOnMrp = cart.items.reduce(
      (acc, item) => acc + item.quantity * (item.price - item.sellingPrice),
      0
    );

    // calculate total amount
    cart.totalAmount = cart.items.reduce(
      (acc, item) =>
        acc + item.quantity * (item.price - (item.price - item.sellingPrice)),
      0
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while removing cart",
    });
  }
};

// get cart details
exports.getCartDetails = async (req, res) => {
  try {
    const { user } = req.body;

    const response = await Cart.find({ user }).populate("items.product").exec();

    res.status(200).json({
      success: false,
      message: "Cart details fetched successfully",
      length: response.length,
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Somethig went wrong while fetchig cart details",
    });
  }
};
