const redis = require('redis');
const client = redis.createClient();

client.on('connect', function () {
    console.log('### Redis Connected ###');

    client.set("ROOM", JSON.stringify({}));
});

client.on('error', function (err) {
    console.error('### Redis Connected Failed : ' + err);
    process.exit();
});

module.exports = client;