const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>OTP Verification Email</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }
  
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .logo {
          font-size: 30px;
          font-weight: bold;
        }
        .logo span {
          color: rgb(225, 3, 3);
        }
  
        .body {
          font-size: 16px;
          margin-bottom: 20px;
          text-align: left;
        }
  
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ffd60a;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
  
        .support {
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
          text-align: left;
        }
  
        .highlight {
          font-weight: bold;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p class="logo">Mansuri<span>Mart</span></p>
        <div class="body">
          <p>Dear User,</p>
          <p>
            Thank you for registering with mansuri mart. Use this OTP to complete
            your signup procedure and verify your account on mansuri mart
          </p>
          <h2 class="highlight">${otp}</h2>
          <p>
            This OTP is valid for 5 minutes. If you did not request this
            verification, please disregard this email. Once your account is
            verified, you will have access to our platform and its features.
          </p>
          <p>
            Remember never share this OTP with anyone, not even mansuri mart ask
            to you
          </p>
        </div>
        <div class="support">
          If you have any questions or need assistance, please feel free to reach
          out to us at
          <a href="caremansurimart@gmail.com">info@mansurimart.com</a>. We are
          here to help!
        </div>
      </div>
    </body>
  </html>`;
};

module.exports = otpTemplate;
