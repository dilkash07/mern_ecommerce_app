const Product = require("../models/Product");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.uploadProduct = async (req, res) => {
  try {
    // fethch data from req body
    const {
      title,
      description,
      brand,
      category,
      price,
      sellingPrice,
      quantity,
      warrantyInformation,
      returnPolicy,
    } = req.body;

    const images = req.files.images;

    // validate data
    if (
      !title ||
      !description ||
      !brand ||
      !category ||
      !price ||
      !sellingPrice ||
      !quantity ||
      !images
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    // upload images
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const response = await uploadImageToCloudinary(images[i], "mansurimart");
      imagesLink.push({
        public_id: response.public_id,
        image_url: response.secure_url,
      });
    }

    const discountPrecentage = ((price - sellingPrice) / price) * 100;
    // savd data in database
    const data = await Product.create({
      title,
      description,
      brand,
      category,
      price,
      sellingPrice,
      discount: discountPrecentage,
      stock: quantity,
      thumbnail: imagesLink[0],
      images: imagesLink,
      warrantyInformation,
      returnPolicy,
    });

    res.status(200).json({
      success: true,
      message: "Product uploaded successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while uploading product",
      error: error.message,
    });
  }
};
