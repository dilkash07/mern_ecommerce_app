// const Cart = require("../models/Cart");
const User = require("../models/User");

// add to cart product
exports.addCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    response = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { cart: productId } }
    );

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding cart",
    });
  }
};

// remove from cart product
exports.removeCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    const response = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { cart: productId } }
    );

    res.status(200).json({
      success: false,
      message: "Product removed from cart",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while removing cart",
    });
  }
};
