const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCharge = (req, res) => {
        stripe.charges.create({
          amount: req.body.amount * 100, //amount in cents
          currency: "usd",
          source: req.body.token.id,
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        })
    }
