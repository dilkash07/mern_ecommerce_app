const Product = require("../models/Product");

exports.getFilteredProduct = async (req, res) => {
  try {
    const {
      query,
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      minDiscount,
      maxDiscount,
      sortOrder,
    } = req.query;
    console.log("category: ", req.query);

    let filter = {};

    if (query) {
      filter.title = { $regex: query, $options: "i" };
    }
    if (category) {
      const categories = category.split("%");
      filter.category = { $in: categories };
    }
    if (brand) {
      const brands = brand.split("%");
      filter.brand = { $in: brands };
    }
    if (minPrice) {
      filter.sellingPrice = { ...filter.sellingPrice, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      filter.sellingPrice = { ...filter.sellingPrice, $lte: Number(maxPrice) };
    }
    if (minRating) {
      filter.rating = { ...filter.rating, $gte: Number(minRating) };
    }
    if (maxRating) {
      filter.rating = { ...filter.rating, $lte: Number(maxRating) };
    }
    if (minDiscount) {
      filter.discount = { ...filter.discount, $gte: Number(minDiscount) };
    }
    if (maxDiscount) {
      filter.discount = { ...filter.discount, $lte: Number(maxDiscount) };
    }

    if (sortOrder) {
      const sort = sortOrder === "ascending" ? 1 : -1;

      const response = await Product.find(filter).sort({ sellingPrice: sort });

      return res.status(200).json({
        success: true,
        length: response.length,
        message: "Product fetched successfully",
        response,
      });
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
