const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const otpTemplate = require("../mail/template/emailVerification");

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 5,
  },
});

// define function to send email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Eamil",
      otpTemplate(otp)
    );
    console.log("Email send successfully: ", mailResponse.response);
  } catch (error) {
    console.log("Error occured while sending email: ", error);
    throw error;
  }
}

// define a pre save hook to send email
otpSchema.pre("save", async function (next) {
  // only send an email when a new document is created
  if (this.isNew) {
    sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
