const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenrator = require("otp-generator");
const Profile = require("../models/Profile");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
require("dotenv").config();

// signup
exports.signup = async (req, res) => {
  try {
    // get data from req body
    const { firstName, lastName, email, password, confirmPassword, otp } =
      req.body;

    // validate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    // match password and confirm password
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and Confirm Password not match",
      });
    }

    // check user already exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already registered, Please login",
      });
    }

    // find the most recent otp
    const otpResponse = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (otpResponse.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP is not valid",
      });
    } else if (otp !== otpResponse[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    // create the additional details
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // create entry in database
    const response = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      additionalDetails: profileDetails._id,
      image: {
        image_url: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      },
    });

    res.status(200).json({
      success: true,
      message: "User created Successfully",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating user",
      error: error.message,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // get data from req body
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    // check user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, Please signup",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      // create a json web token
      const payload = {
        email: user.email,
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
      };

      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:
          user.role === "User"
            ? process.env.TOKEN_EXPIRY
            : process.env.ADMIN_TOKEN_EXPIRY,
      });

      // save token to user document in database
      user.token = token;
      user.password = undefined;

      if (user.role === "Admin") {
        // send token in response
        const options = {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        return res.cookie("token", token, options).status(200).json({
          success: true,
          message: "Admin logged in successfully",
          user,
          token,
        });
      }

      // send token in response
      const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "user or password not valid",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while logged in",
      error: error.message,
    });
  }
};

// send otp
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // check user already registered
    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already registered, Please login",
      });
    }

    // genrate otp
    var otp = otpGenrator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // find otp already saved
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenrator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    await OTP.create({ email, otp });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
      error: error.message,
    });
  }
};

// update password
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ _id: id });

    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    } else {
      return res.status(401).json({
        success: false,
        message: "Password not match",
      });
    }

    const response = await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while changing password",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;
    await Cart.findOneAndDelete({ user: id });
    await Wishlist.findOneAndDelete({ user: id });
    const user = await User.findOneAndDelete({ _id: id });
    await Profile.findOneAndDelete({
      _id: user.additionalDetails,
    });

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting account",
    });
  }
};
