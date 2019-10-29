const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/user/register', UserController.registerUser);

router.post('/user/login', function (req, res, next) {
    passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        if (err || !user) {
            return res.json(info);
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign({
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                avatar: user.avatar,
            }, '1612145');

            return res.json({
                returnCode: 1,
                token: token
            });
        });
    })(req, res);
});

router.post('/user/update',multer.any(), UserController.updateUserInfo);

router.get('/me', function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, (err, user, info) => {
        if (err || !user) {
            return res.json({
                returnCode: -1,
                message: "JWT không hợp lệ."
            });
        }
        return res.json({
            returnCode: 1,
            message: user
        });
    })(req, res, next);
});

module.exports = router;