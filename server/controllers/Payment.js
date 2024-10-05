const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.processPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    response = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      metadata: {
        company: "MansuriMart",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: response.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while processing payment",
    });
  }
};
