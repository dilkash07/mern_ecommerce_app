const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// add to wishlist product
exports.addWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    const wishlist = await Wishlist.findOne({ user: userId })
      .populate("items.product")
      .exec();

    if (wishlist) {
      wishlist.items.push({
        product: productId,
      });

      await wishlist.save();

      wishlist.items[wishlist.items.length - 1].product = product;

      res.status(200).json({
        success: true,
        message: "Product added to wishlist",
        response: wishlist,
      });
    } else {
      const newWishlist = new Wishlist({
        user: userId,
        items: [
          {
            product: productId,
          },
        ],
      });

      await newWishlist.save();

      newWishlist.items[0].product = product;

      res.status(200).json({
        success: true,
        message: "Product added to wishlist",
        response: newWishlist,
      });
    }
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
    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId })
      .populate("items.product")
      .exec();

    const itemIndex = wishlist.items.findIndex(
      (item) => item.product._id.toString() === productId
    );
    // console.log(itemIndex);

    wishlist.items.splice(itemIndex, 1);

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      response: wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while removing wishlist",
    });
  }
};

// get wishlist product
exports.getWishlist = async (req, res) => {
  try {
    // const { userId } = req.body;

    //temporary
    const userId = "666d526c5d9f95625ffe8125";

    const response = await Wishlist.findOne({ user: userId })
      .populate("items.product")
      .exec();

    res.status(200).json({
      success: true,
      message: "Wishlist details fetched successfully",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Somethig went wrong while fetchig wishlist details",
    });
  }
};
