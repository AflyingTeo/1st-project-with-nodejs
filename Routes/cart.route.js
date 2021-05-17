const express = require('express')
const router = express.Router();
// const authController = require('../controller/auth.controller');
const cartController = require('../controller/cart.controller');

router.get('/add/:productId', cartController.addProducts)



module.exports = router;