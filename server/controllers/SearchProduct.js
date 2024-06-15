const Product = require("../models/Product");

exports.searchProduct = async (req, res) => {
  try {
    const {
      query,
      category,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      brand,
      minDiscount,
      maxDiscount,
    } = req.query;

    let filter = {};

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
    if (minRating) {
      filter.rating = { ...filter.rating, $gte: Number(minRating) };
    }
    if (maxRating) {
      filter.rating = { ...filter.rating, $lte: Number(maxRating) };
    }
    if (brand) {
      const brandArray = brand.split("%");
      filter.brand = { $in: brandArray };
    }
    if (minDiscount) {
      filter.discount = { ...filter.discount, $gte: Number(minDiscount) };
    }
    if (maxDiscount) {
      filter.discount = { ...filter.discount, $lte: Number(maxDiscount) };
    }

    const response = await Product.find(filter);

    res.status(200).json({
      success: true,
      length: response.length,
      message: "Product fetched successfully",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wronng while searching product",
    });
  }
};
