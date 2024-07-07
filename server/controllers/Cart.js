const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");

// add to cart product
exports.addCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .exec();

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === productId
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

      cart.items[cart.items.length - 1].product = product;

      res.status(200).json({
        success: true,
        message: "Product added to cart",
        response: cart,
      });
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

      newCart.items[0].product = product;

      const data = res.status(200).json({
        success: true,
        message: "product added to cart",
        response: newCart,
      });
    }
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

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .exec();

    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId
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
      response: cart,
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
    const { id } = req.user;

    const response = await Cart.findOne({ user: id })
      .populate("items.product")
      .exec();

    res.status(200).json({
      success: true,
      message: "Cart details fetched successfully",
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
