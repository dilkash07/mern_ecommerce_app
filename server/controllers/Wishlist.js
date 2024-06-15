const User = require("../models/User");

// add to wishlist product
exports.addWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    response = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { wishlist: productId } }
    );

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      response,
    });
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
    const { productId, userId } = req.body;

    const response = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { wishlist: productId } }
    );

    res.status(200).json({
      success: false,
      message: "Product removed from wishlist",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while removing wishlist",
    });
  }
};
