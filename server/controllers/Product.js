const Product = require("../models/Product");
const Category = require("../models/Category");

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

// get product category
exports.getProductCategory = async (req, res) => {
  try {
    const response = await Category.find({});

    res.status(200).json({
      success: true,
      message: "Product category fetched successfully",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching product category",
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

// get filtered product
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
