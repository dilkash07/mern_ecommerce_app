const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.uploadProductCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const image = req?.files?.categoryImage;

    if (!categoryName || !image) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    const category = await Category.find({ categoryName });

    if (category.length > 0) {
      return res.status(401).json({
        success: false,
        message: "Product category already exist",
      });
    }

    const img = await uploadImageToCloudinary(image, "mansurimart");

    await Category.create({
      categoryName,
      categoryImage: {
        public_id: img.public_id,
        image_url: img.secure_url,
      },
    });

    const response = await Category.find({});

    res.status(200).json({
      success: true,
      message: "Product category uploaded",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while uploaded product category",
    });
  }
};

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
