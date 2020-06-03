const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const { createCharge } = require("../controllers/stripe");

router.post(
    "/stripe/payment/:userId",
    requireSignin,
    isAuth,
    createCharge
);

router.param("userId", userById);

module.exports = router;