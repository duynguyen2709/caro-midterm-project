const conn = require('../utilities/mysql');
const bcrypt = require('bcryptjs');

module.exports.getUser = async (username) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User WHERE username = ?', [username])
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res[0])
        return null;
        
    return {
        username: res[0].username,
        password: res[0].password
    };
};

module.exports.createUser = async (user) => {
    const hash = bcrypt.hashSync(user.password, 8);
    const [res, f] = await conn.getConnection()
        .query('INSERT INTO User SET ?', {
            username: user.username,
            password: hash,
            email: user.email,
            fullName: user.fullName
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};