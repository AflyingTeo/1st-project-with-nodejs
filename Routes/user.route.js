const express = require('express')
const router = express.Router()
const usersController = require('../controller/users.controller');
const userCreateValidate = require('../middleware/validate/user.create.validate')
const authMiddleware = require('../middleware/login/auth.middleware');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' })

router.get('/', authMiddleware.authRequire, usersController.index);
router.get('/search', authMiddleware.authRequire, usersController.search);
router.get('/create', usersController.getCreate);
router.post('/create', upload.single('avatar'),userCreateValidate.userCreateValidate, usersController.postCreate);
router.get('/:id',authMiddleware.authRequire, usersController.userDetails);

module.exports = router;
