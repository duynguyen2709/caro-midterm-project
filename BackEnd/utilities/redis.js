const redis = require('redis');
const userModel = require('../models/User');

const client = redis.createClient();

const USER_PREFIX = 'USER_';

client.on('connect', function() {
    console.log('### Redis Connected ###');

    client.del("ROOM");
    // putAllUserToCache().catch(err => {
    //     console.error(err);
    // })
});

client.on('error', function (err) {
    console.error('### Redis Connected Failed : ' + err);
    process.exit();
});

const putAllUserToCache = async () => {
    const arr = await userModel.getAllUser();
    client.set(USER_PREFIX, JSON.stringify(arr));

    client.get(USER_PREFIX, (err, user) => {
        console.log(JSON.parse(user));
    })
};

module.exports = client;