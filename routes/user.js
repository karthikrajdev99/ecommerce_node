const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth')
const { read, update, purchaseHistory } = require('../controllers/user');


router.get('/user', auth, read);
router.put('/user', auth, update);
router.get('/orders/by/user', auth, purchaseHistory);

module.exports = router;
