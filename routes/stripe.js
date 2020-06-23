const express = require("express");
const router = express.Router();
const auth = require('../helpers/auth')

const { createCharge } = require("../controllers/stripe");

router.post(
    "/stripe/payment",
    auth,
    createCharge
);

module.exports = router;