const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/user/register', UserController.registerUser);

router.post('/user/changepassword', UserController.changePassword);

router.post('/user/login', UserController.login);

router.post('/user/update', multer.any(), UserController.updateUserInfo);

router.get('/me', UserController.getUserInfo);

module.exports = router;