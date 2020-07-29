const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCharge = (req, res) => {
        stripe.charges.create({
          amount: req.body.amount * 100, //amount in cents
          currency: "usd",
          source: req.body.token.id,
          receipt_email: req.body.token.email
        },
        (error, charges) => {
            if (error) {
                return res.status(500).json(error);
            } else {
                return res.json(charges);
            }
        })
    }
