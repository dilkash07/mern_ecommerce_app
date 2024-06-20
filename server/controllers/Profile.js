const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id);
    // .populate("cart")
    // .populate("wishlist")
    // .exec();
    userDetails.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User details fethced successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user details",
    });
  }
};
