const express = require('express')
const router = express.Router();
const productsController = require('../controller/products.controller');

router.get('/products-list', productsController.getProducts);
// router.post('/login', authController.postLogin);

module.exports = router;
