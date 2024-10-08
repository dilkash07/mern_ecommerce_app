const Product = require("../models/Product");

// get all product
exports.getAllProduct = async (req, res) => {
  try {
    const response = await Product.find({});

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching product",
      error: error.message,
    });
  }
};

// get single product
exports.getProductDetails = async (req, res) => {
  try {
    const response = await Product.findById({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching product",
      error: error.message,
    });
  }
};

// get recommended product
exports.getRecommendedProduct = async (req, res) => {
  try {
    const { category, itemId } = req.body;

    const product = await Product.find({ category });
    const response = product.filter((item) => item._id.toString() !== itemId);

    res.status(200).json({
      success: true,
      message: "Recommended product fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching recommended product",
    });
  }
};
