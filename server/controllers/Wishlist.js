const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { priceDetailsCalculator } = require("../utils/priceDetailsCalculator");

// add to wishlist product
exports.addWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    const wishlist = await Wishlist.findOne({ user: id })
      .populate("items.product")
      .exec();

    if (wishlist) {
      wishlist.items.push({
        product: productId,
      });

      await wishlist.save();

      wishlist.items[wishlist.items.length - 1].product = product;

      res.status(200).json({
        success: true,
        message: "Product added to wishlist",
        response: wishlist,
      });
    } else {
      const newWishlist = new Wishlist({
        user: id,
        items: [
          {
            product: productId,
          },
        ],
      });

      await newWishlist.save();

      newWishlist.items[0].product = product;

      res.status(200).json({
        success: true,
        message: "Product added to wishlist",
        response: newWishlist,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding wishlist",
    });
  }
};

// remove from wishlist product
exports.removeWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: id })
      .populate("items.product")
      .exec();

    const itemIndex = wishlist.items.findIndex(
      (item) => item.product._id.toString() === productId
    );

    wishlist.items.splice(itemIndex, 1);

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      response: wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while removing wishlist",
    });
  }
};

// get wishlist product
exports.getWishlistDetails = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await Wishlist.findOne({ user: id })
      .populate("items.product")
      .exec();

    res.status(200).json({
      success: true,
      message: "Wishlist details fetched successfully",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Somethig went wrong while fetchig wishlist details",
    });
  }
};

// move to wishlist
exports.moveToWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    const wishlist = await Wishlist.findOne({ user: id })
      .populate("items.product")
      .exec();
    const cart = await Cart.findOne({ user: id })
      .populate("items.product")
      .exec();

    // remove cart item
    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId
    );

    cart.items.splice(itemIndex, 1);
    priceDetailsCalculator(cart);
    await cart.save();

    // add wishlist items
    if (wishlist) {
      const itemIndex = wishlist.items.findIndex(
        (item) => item.product._id.toString() === productId
      );

      if (itemIndex > -1) {
        res.status(200).json({
          success: true,
          cart,
          wishlist,
        });
      } else {
        wishlist.items.push({
          product: productId,
        });
        await wishlist.save();
        wishlist.items[wishlist.items.length - 1].product = product;
        res.status(200).json({
          success: true,
          message: "Moved to wishlist successfully",
          cart,
          wishlist,
        });
      }
    } else {
      const newWishlist = new Wishlist({
        user: id,
        items: [
          {
            product: productId,
          },
        ],
      });

      await newWishlist.save();

      newWishlist.items[0].product = product;
      res.status(200).json({
        success: true,
        message: "Moved to wishlist successfully",
        cart,
        wishlist: newWishlist,
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
