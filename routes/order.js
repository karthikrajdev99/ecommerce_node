const express = require("express");
const router = express.Router();

const auth = require('../helpers/auth')
const { isAdmin } = require("../controllers/auth");
const { addOrderToUserHistory } = require("../controllers/user");
const {
    create,
    listOrders,
    getStatusValues,
    orderById,
    updateOrderStatus
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

/**
 * @swagger
 *  nodes/api/order/create:
 *   post:
 *     summary: order
 *     description: create order for ecommerce
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               products:
 *                 type: string
 *               transaction_id:
 *                 type: string
 *               amount:
 *                 type: integer
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: order created sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.post(
    "/order/create",
    auth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
);

/**
 * @swagger
 *  nodes/api/order/list:
 *   get:
 *     summary: orders
 *     description: listed orders of registered user
 *     responses:
 *       200:
 *         description: orders listed sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.get("/order/list", auth, isAdmin, listOrders);

/**
 * @swagger
 *  nodes/api/order/status-values:
 *   get:
 *     summary: orders status
 *     description: listed status of orders of registered user
 *     responses:
 *       200:
 *         description: status orders listed
 *       400:
 *         description: Bad request, try again
*/
router.get(
    "/order/status-values",
    auth,
    isAdmin,
    getStatusValues
);

/**
 * @swagger
 *  nodes/api/order/:orderId/status:
 *   put:
 *     summary: orders
 *     description: update status of orders of registered user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: status orders updated
 *       400:
 *         description: Bad request, try again
*/
router.put(
    "/order/:orderId/status",
    auth,
    isAdmin,
    updateOrderStatus
);

router.param("orderId", orderById);

module.exports = router;
