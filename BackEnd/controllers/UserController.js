const userModel = require('../models/User');
const Firebase = require('../utilities/FirebaseUpload');

exports.registerUser = async function (req, res, next) {
    const user = req.body.user;

    const find = await userModel.getUser(user.username);
    if (find != null){
        res.json({
            returnCode: -1,
            message: "Username Đã Tồn Tại. Vui Lòng Chọn Username Khác."
        });
        return;
    }

    const result = await userModel.createUser(user);
    if (result != null && result.affectedRows === 1){
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

exports.changePassword = async function(req,res) {
    const {username, password} = req.body;
    const result = await userModel.changePassword(username, password);
    if (result != null && result.affectedRows === 1){
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
};

exports.updateUserInfo = async function (req, res) {
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
    if (result != null && result.affectedRows === 1){
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
};