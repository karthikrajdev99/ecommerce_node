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


router.get("/product/:productId", read);
router.route("/product/create").post(auth, isAdmin, create);
router.delete(
    "/product/:productId",
    auth,
    isAdmin,
    remove
);


router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);


router.param("productId", productById);

module.exports = router;
