const express = require('express')
const router = express.Router();

const homeController = require('../controller/home.controller');
const authMiddleware = require('../middleware/login/auth.middleware');

router.get('/home', homeController.getHome);

module.exports = router;
