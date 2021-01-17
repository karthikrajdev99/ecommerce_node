const express = require("express");
const router = express.Router();
const auth = require('../helpers/auth')

const { createCharge } = require("../controllers/stripe");

/**
 * @swagger
 *  nodes/api/stripe/payment:
 *   post:
 *     summary: payments
 *     description: stripe payments integration
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: full name of the user
 *               receipt_email:
 *                 type: string
 *                 description: email address
 *               source:
 *                 type: string
 *     responses:
 *       200:
 *         description: user payment sucessfull
 *       500:
 *         description: internal server error
*/

router.post(
    "/stripe/payment",
    auth,
    createCharge
);

module.exports = router;