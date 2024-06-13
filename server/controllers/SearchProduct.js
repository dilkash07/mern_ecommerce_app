const Product = require("../models/Product");

exports.searchProduct = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice } = req.query;

    let filter = {};

    const regex = { $regex: query, $options: "i" };

    if (query) {
      filter.title = { $regex: query, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }
    // ratings remaining hai

    console.log(filter);

    const response = await Product.find(filter);

    res.status(200).json({
      success: true,
      length: response.length,
      message: "Searching product fetched successfully",
      response,
      // filter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wronng while searching product",
    });
  }
};
