const jwt = require("jsonwebtoken");
require("dotenv").config;

exports.auth = async (req, res, next) => {
  try {
    // get token from req body || req.params || req header ||
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    console.log("Token:    ", token);
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

      console.log("Token vaildate successfull");
      // console.log(decode);
      // res.status(200).json({
      //   success: true,
      //   message: "Token validate successfully",
      //   decode,
      // });
    } catch (error) {
      console.error(error);
      res.status(401).json({
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
