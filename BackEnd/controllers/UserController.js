const userModel = require('../models/User');

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