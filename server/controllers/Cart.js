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
        cart.items.push({ product: productId, quantity });
      }

      cart.totalMrp = cart.items.reduce(
        (acc, item) => acc + item.quantity * product.price,
        0
      );

      await cart.save();
    } else {
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
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

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.total = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
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

// change cart quantity
exports.changeCartQuantity = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    const response = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    res.status(200).json({
      success: false,
      message: "Cart quantity changed successfully",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while changing cart quantity",
    });
  }
};

// get cart details
exports.getCart = async (req, res) => {
  try {
    const { user } = req.body;

    const response = await Cart.find({ user }).populate("product").exec();

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
