const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:3001/login',
        session: false

    }), (req, res) => {
        let responseHTML = '<script>res = %value%; window.opener.postMessage(res, "*");window.close();</script>';

        const user = req.user;
        if (user == null) {
            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                returnCode: 0,
                message: "Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau."
            }));
            res.send(responseHTML);
            return;
        }

        const token = jwt.sign({
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
        }, '1612145');

        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            returnCode: 1,
            token: token
        }));
        res.send(responseHTML);
    });


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email', 'openid']
}));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3001/login',
        session: false
    }), (req, res) => {
        let responseHTML = '<script>res = %value%; window.opener.postMessage(res, "*");window.close();</script>';
        const user = req.user;
        if (user == null) {
            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                returnCode: 0,
                message: "Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau."
            }));
            res.send(responseHTML);
            return;
        }

        const token = jwt.sign({
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
        }, '1612145');
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            returnCode: 1,
            token: token
        }));
        res.send(responseHTML);
    });

module.exports = router;