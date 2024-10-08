const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("additionalDetails").exec();

    users.forEach((user) => (user.password = undefined));

    return res.status(200).json({
      success: true,
      message: "Users fethced successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching users",
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const response = (
      await Order.find().populate("user").populate("shippingInfo").exec()
    ).reverse();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching orders",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const response = await Product.find();

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
      const response = await uploadImageToCloudinary(
        images[i],
        "MansuriMart/Product"
      );
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

    const img = await uploadImageToCloudinary(image, "MansuriMart/Category");

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

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const response = (
      await Order.find().populate("user").populate("shippingInfo").exec()
    ).reverse();

    const order = response.find((order) => order.id === req.params.id);

    if (order) {
      if (
        [
          "Processing",
          "Shipped",
          "Out For Delivery",
          "Delivered",
          "Cancelled",
        ].includes(status)
      ) {
        order.orderStatus = status;

        // Handle delivery time if marked as delivered
        if (status === "Delivered") {
          order.deliveredAt = Date.now();
          if (order.paymentMethod === "Cash") {
            order.paymentInfo.status = "Completed";
            order.paidAt = Date.now();
          }
        }
        await order.save();

        res.status(200).json({
          success: true,
          message: "Orders status updated successfully",
          response,
        });
      } else {
        res.status(400).json({ message: "Invalid status" });
      }
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating status",
    });
  }
};
