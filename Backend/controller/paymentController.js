const Stripe = require("stripe");

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

const createPaymentIntent =
async (req, res) => {

  try {

    const { amount } = req.body;

    const paymentIntent =
      await stripe.paymentIntents.create({

        amount: amount * 100,
        currency: "npr",

        automatic_payment_methods: {
          enabled: true
        }

      });

    res.status(200).json({

      clientSecret:
        paymentIntent.client_secret

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Stripe Payment Intent Failed"
    });

  }

};

module.exports = {
  createPaymentIntent
};