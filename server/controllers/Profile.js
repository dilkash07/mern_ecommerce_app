const Mongoose = require("mongoose");
const Profile = require("../models/Profile");
const User = require("../models/User");
const {
  uploadImageToCloudinary,
  removeImageFromCloudinary,
} = require("../utils/imageUploader");

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

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

exports.updateProfilePricture = async (req, res) => {
  try {
    const { id } = req.user;
    const image = req.files.profilePicture;

    console.log("image: ", image);

    const user = await User.findOne({ _id: id });

    let profilePicture;
    if (user.image.public_id) {
      await removeImageFromCloudinary(user.image.public_id);
      profilePicture = await uploadImageToCloudinary(image, "MansuriMart/User");
    } else {
      profilePicture = await uploadImageToCloudinary(image, "MansuriMart/User");
    }

    user.image.image_url = profilePicture.secure_url;
    user.image.public_id = profilePicture.public_id;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      response: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile picture",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, dateOfBirth, gender, contactNumber, about } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !contactNumber ||
      !about
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      { firstName, lastName },
      { new: true }
    );
    const profile = await Profile.findOneAndUpdate(
      { _id: new Mongoose.Types.ObjectId(user.additionalDetails) },
      {
        dateOfBirth,
        gender,
        contactNumber,
        about,
      },
      { new: true }
    );

    user.additionalDetails = profile;
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      response: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile",
    });
  }
};
