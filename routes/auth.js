const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout
} = require("../controllers/auth");


/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: register user
 *     description: register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: full name of the user
 *               email:
 *                 type: string
 *                 description: email address
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: user registered sucessfully
 *       400:
 *         description: bad request, client error
*/
router.post("/signup", signup);
/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: login user
 *     description: logging in a registered user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: email address
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: user loggedin sucessfully
 *       400:
 *         description: bad request, client error
*/
router.post("/signin", signin);
/**
 * @swagger
 * /api/signout:
 *   post:
 *     summary: logout user
 *     requestBody:
 *       description: logout a new user
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               _id:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: user logout sucessfull
 *       500:
 *         description: internel server error
*/
router.post("/signout", signout);

module.exports = router;
