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

router.post(
    "/order/create",
    auth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
);

router.get("/order/list", auth, isAdmin, listOrders);
router.get(
    "/order/status-values",
    auth,
    isAdmin,
    getStatusValues
);
router.put(
    "/order/:orderId/status",
    auth,
    isAdmin,
    updateOrderStatus
);

router.param("orderId", orderById);

module.exports = router;
