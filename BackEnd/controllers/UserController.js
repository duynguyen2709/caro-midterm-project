const userModel = require('../models/User');
const Firebase = require('../utilities/FirebaseUpload');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.getAllUser = async function (req, res) {
    userModel.getAllUser();
};

exports.registerUser = async function (req, res, next) {
    const user = req.body.user;

    const find = await userModel.getUser(user.username);
    if (find != null) {
        res.json({
            returnCode: -1,
            message: "Username Đã Tồn Tại. Vui Lòng Chọn Username Khác."
        });
        return;
    }

    const result = await userModel.createUser(user);
    if (result != null && result.affectedRows === 1) {
        res.json({
            returnCode: 1,
            message: "Tạo Tài Khoản Thành Công."
        });
    } else {
        res.json({
            returnCode: 0,
            message: "Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau."
        });
    }
};

exports.login = function (req, res, next) {
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
};

exports.getUserInfo = function (req, res, next) {
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
};

exports.changePassword = function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, async (err, user, info) => {
        if (err || !user) {
            return res.json({
                returnCode: -1,
                message: "JWT không hợp lệ."
            });
        }
        const {username, password} = req.body;
        const result = await userModel.changePassword(username, password);
        if (result != null && result.affectedRows === 1) {
            res.json({
                returnCode: 1,
                message: "Cập Nhật Thành Công."
            });
        } else {
            res.json({
                returnCode: 0,
                message: "Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau."
            });
        }
    })(req, res, next);
};

exports.updateUserInfo = function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, async (err, user, info) => {
        if (err || !user) {
            return res.json({
                returnCode: -1,
                message: "JWT không hợp lệ."
            });
        }

        let avatar = req.body.avatar;
        const {username, email, fullName} = req.body;
        const newAvatarFile = req.files[0];
        
        if (newAvatarFile) {
            try {
                avatar = await Firebase.UploadImageToStorage(newAvatarFile);
            } catch (e) {
                console.error(e);
                avatar = req.body.avatar;
            }
        }

        const result = await userModel.updateUserInfo(username, avatar, email, fullName);
        if (result != null && result.affectedRows === 1) {
            res.json({
                returnCode: 1,
                message: "Cập Nhật Thành Công."
            });
        } else {
            res.json({
                returnCode: 0,
                message: "Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau."
            });
        }
    })(req, res, next);
};