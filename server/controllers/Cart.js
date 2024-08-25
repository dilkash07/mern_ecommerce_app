const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");
const { priceDetailsCalculator } = require("../utils/priceDetailsCalculator");

// add to cart product
exports.addCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    const cart = await Cart.findOne({ user: id })
      .populate("items.product")
      .exec();

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        priceDetailsCalculator(cart);
        cart.save();
        return res.status(200).json({
          success: true,
          response: cart,
        });
      } else {
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
          sellingPrice: product.sellingPrice,
        });
      }

      priceDetailsCalculator(cart);
      await cart.save();
      cart.items[cart.items.length - 1].product = product;

      res.status(200).json({
        success: true,
        message: "Product added to cart",
        response: cart,
      });
    } else {
      const newCart = new Cart({
        user: id,
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
    const { id } = req.user;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: id })
      .populate("items.product")
      .exec();

    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId
    );

    cart.items.splice(itemIndex, 1);
    priceDetailsCalculator(cart);

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

// move to cart
exports.moveToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    const wishlist = await Wishlist.findOne({ user: id })
      .populate("items.product")
      .exec();
    const cart = await Cart.findOne({ user: id })
      .populate("items.product")
      .exec();

    // remove wishlist item
    const itemIndex = wishlist.items.findIndex(
      (item) => item.product._id.toString() === productId
    );

    wishlist.items.splice(itemIndex, 1);
    wishlist.save();

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = cart.items[itemIndex].quantity + 1;
        priceDetailsCalculator(cart);
        cart.save();
        return res.status(200).json({
          success: true,
          cart,
          wishlist,
        });
      } else {
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
          sellingPrice: product.sellingPrice,
        });
      }

      priceDetailsCalculator(cart);
      await cart.save();
      cart.items[cart.items.length - 1].product = product;

      res.status(200).json({
        success: true,
        message: "Moved to cart successfully",
        cart,
        wishlist,
      });
    } else {
      const newCart = new Cart({
        user: id,
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

      res.status(200).json({
        success: true,
        message: "Moved to cart successfully",
        cart: newCart,
        wishlist,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while move to cart",
    });
  }
};

// reset cart
exports.resetCart = async (req, res) => {
  try {
    const { id } = req.user;
    await Cart.findOneAndDelete({ user: id });

    res.status(200).json({
      success: true,
      message: "Cart reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while resetting cart",
    });
  }
};
