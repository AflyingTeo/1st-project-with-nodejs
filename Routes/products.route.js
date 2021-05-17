const express = require('express')
const router = express.Router();
const productsController = require('../controller/products.controller');
const cartAddedItemsCount = require('../middleware/cart/cartcount.middleware');


router.get('/products-list',cartAddedItemsCount, productsController.getProducts);
// router.post('/login', authController.postLogin);

module.exports = router;
