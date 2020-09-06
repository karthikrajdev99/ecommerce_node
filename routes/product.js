const express = require("express");
const router = express.Router();
const auth = require('../helpers/auth')
const {
    create,
    productById,
    read,
    remove,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch
} = require("../controllers/product");
const { isAdmin } = require("../controllers/auth");

/**
 * @swagger
 *  /api/product/:productId:
 *   get:
 *     summary: product
 *     description: get specific product for ecommerce
 *     responses:
 *       200:
 *         description: product listed sucessfully
 *       400:
 *         description: Bad request, try again
*/

router.get("/product/:productId", read);

/**
 * @swagger
 *  /api/product/create:
 *   post:
 *     summary: product
 *     description: create product for ecommerce
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               category:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               sold:
 *                 type: integer
 *               shipping:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: product created sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.route("/product/create").post(auth, isAdmin, create);

/**
 * @swagger
 *  /api/product/:productId:
 *   delete:
 *     summary: product
 *     description: delete product for ecommerce
 *     responses:
 *       204:
 *         description: product deleted sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.delete(
    "/product/:productId",
    auth,
    isAdmin,
    remove
);

/**
 * @swagger
 *  /api/products:
 *   get:
 *     summary: products
 *     description: listed products for ecommerce
 *     responses:
 *       200:
 *         description: products listed sucessfully
 *       400:
 *         description: Bad request, try again
*/

router.get("/products", list);

/**
 * @swagger
 *  /api/products/search:
 *   get:
 *     summary: products
 *     description: listed products for ecommerce
 *     responses:
 *       200:
 *         description: products listed sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.get("/products/search", listSearch);

/**
 * @swagger
 *  /api/products/related/:productId:
 *   get:
 *     summary: product
 *     description: get related product for ecommerce
 *     responses:
 *       200:
 *         description: product listed sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.get("/products/related/:productId", listRelated);

/**
 * @swagger
 *  /api/products/categories:
 *   get:
 *     summary: product categories
 *     description: listed product categories for ecommerce
 *     responses:
 *       200:
 *         description: product categories listed sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);

/**
 * @swagger
 *  /api/product/photo/:productId:
 *   get:
 *     summary: product photo
 *     description: get specific product photo for ecommerce
 *     responses:
 *       200:
 *         description: product photo listed sucessfully
 *       400:
 *         description: Bad request, try again
*/
router.get("/product/photo/:productId", photo);


router.param("productId", productById);

module.exports = router;
