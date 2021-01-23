const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth')
const { read, update, purchaseHistory } = require('../controllers/user');

/**
 * @swagger
 *  /nodes/api/user:
 *   get:
 *     summary: user
 *     description: user details
 *     responses:
 *       200:
 *         description: user details listed sucessfully
 *       400:
 *         description: Bad request, try again
*/

router.get('/user', auth, read);

/**
 * @swagger
 *  /nodes/api/user:
 *   put:
 *     summary: category
 *     description: update category for ecommerce
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: name of the user
 *               email:
 *                 type: string
 *                 description: email of the user
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: category updated sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.put('/user', auth, update);

/**
 * @swagger
 *  /nodes/api/orders/by/user:
 *   get:
 *     summary: purchase history
 *     description: purchase history of user
 *     responses:
 *       200:
 *         description: purchase history of user listed sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.get('/orders/by/user', auth, purchaseHistory);

module.exports = router;
