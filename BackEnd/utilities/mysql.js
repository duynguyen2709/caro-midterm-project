const mysql = require('mysql2/promise');
const nodeCleanup = require('node-cleanup');

var conn = null;

nodeCleanup(function (exitCode, signal) {
    if (conn != null){
        console.log("Cleanup Connection...");
        conn.end();
    }
    process.exit();
});

module.exports.initConnection = async () => {
    conn = await mysql.createPool({
        host: "167.179.80.90",
        user: "1612145",
        password: "1612145",
        database: "AdvancedWebDevelopment",
        charset: "utf8_general_ci",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
};

module.exports.getConnection = () => {return conn};