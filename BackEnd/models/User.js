const conn = require('../utilities/mysql');
const bcrypt = require('bcryptjs');

module.exports.getUser = async (username) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User WHERE username = ?', [username])
        .then(([rows, fields]) => {
            return [rows, fields];
        })

    if (!res[0])
        return null;
        
    return {
        username: res[0].username,
        password: res[0].password
    };
};

module.exports.createUser = async (username, password) => {
    var hash = bcrypt.hashSync(password, 8);
    const [res, f] = await conn.getConnection()
        .query('INSERT INTO User SET ?', {
            username: username,
            password: hash
        })
        .then(([rows, fields]) => {
            return [rows, fields];
        });

    return res;
};