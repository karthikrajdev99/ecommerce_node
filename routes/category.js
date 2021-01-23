const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth')
const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { isAdmin } = require('../controllers/auth');

/**
 * @swagger
 *  /nodes/api/category/:categoryId:
 *   get:
 *     summary: category
 *     description: get category for ecommerce
 *     responses:
 *       200:
 *         description: category listed sucessfully
 *       400:
 *         description: Bad request, try again
*/

router.get('/category/:categoryId', read);
/**
 * @swagger
 *  /nodes/api/category/create:
 *   post:
 *     summary: category
 *     description: create category for ecommerce
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: category created sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.post('/category/create', auth, isAdmin, create);

/**
 * @swagger
 *  /nodes/api/category/:categoryId:
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
 *     responses:
 *       200:
 *         description: category updated sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.put('/category/:categoryId', auth, isAdmin, update);

/**
 * @swagger
 *  /nodes/api/category/:categoryId:
 *   delete:
 *     summary: category
 *     description: delete category for ecommerce
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       204:
 *         description: category deleted sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.delete('/category/:categoryId', auth, isAdmin, remove);

/**
 * @swagger
 *  /nodes/api/categories:
 *   get:
 *     summary: category
 *     description: listed category for ecommerce
 *     responses:
 *       200:
 *         description: category listed sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.get('/categories', list);

router.param('categoryId', categoryById);

module.exports = router;
