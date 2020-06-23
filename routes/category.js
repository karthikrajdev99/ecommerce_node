const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth')
const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { isAdmin } = require('../controllers/auth');


router.get('/category/categoryId', read);
router.post('/category/create', auth, isAdmin, create);

router.put('/category/categoryId', auth, isAdmin, update);

router.delete('/category/categoryId', auth, isAdmin, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);

module.exports = router;
