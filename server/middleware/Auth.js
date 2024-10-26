const jwt = require("jsonwebtoken");
require("dotenv").config;

exports.auth = async (req, res, next) => {
  try {
    // get token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    // check jwt token missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing!",
      });
    }

    // verify token and send response
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = decode;
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while validating token",
      error: error.message,
    });
  }
};

// user middleware
exports.admin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid User",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while validating user",
      error: error.message,
    });
  }
};
