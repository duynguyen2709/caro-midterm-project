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
        password: res[0].password,
        fullName: res[0].fullName,
        email: res[0].email,
    };
};


module.exports.findByFacebookID = async (facebookID) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User WHERE facebookID = ?', [facebookID])
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
        password: res[0].password,
        fullName: res[0].fullName,
        email: res[0].email,
    };
};

module.exports.findByGoogleID = async (googleID) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User WHERE googleID = ?', [googleID])
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
        password: res[0].password,
        fullName: res[0].fullName,
        email: res[0].email,
    };
};

module.exports.findByEmail = async (email) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User WHERE email = ?', [email])
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
        password: res[0].password,
        fullName: res[0].fullName,
        email: res[0].email,
    };
};

module.exports.createUser = async (user) => {
    const hash = bcrypt.hashSync(user.password, 8);
    const [res, f] = await conn.getConnection()
        .query('INSERT INTO User SET ?', {
            username: user.username,
            password: hash,
            email: user.email,
            fullName: user.fullName,
            facebookID: user.facebookID,
            googleID: user.googleID
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};


module.exports.updateFacebookID = async (username, facebookID) => {

    let query = `UPDATE User SET facebookID = '${facebookID}' where username = '${username}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};


module.exports.updateGoogleID = async (username, googleID) => {

    let query = `UPDATE User SET googleID = '${googleID}' where username = '${username}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};