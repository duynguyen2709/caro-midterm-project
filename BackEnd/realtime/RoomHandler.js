const redis = require('../utilities/redis');
const GameHandler = require('./GameHandler');

module.exports.findPlayer = (io, socket, data) => {
    if (!data) {
        console.error('Null Player Object');
        return;
    }

    return redis.get("ROOM", (err, rawRoom) => {

        if (rawRoom) {
            let roomEntity = JSON.parse(rawRoom);

            // empty object
            // no room created
            if (Object.entries(roomEntity).length === 0 &&
                roomEntity.constructor === Object) {
                // create new room
                const roomID = new Date().getTime();
                const newRoom = {
                    roomID: roomID,
                    player1: data,
                    socketID: socket.id
                };

                socket.join(roomID);
                roomEntity[roomID] = newRoom;
            } else {
                const roomValue = roomEntity[Object.keys(roomEntity)[0]];

                // if player 1 already disconnected
                // set new player as player 1
                // delete old room
                if (io.sockets.connected[roomValue.socketID] == null ||
                    !io.sockets.connected[roomValue.socketID].connected) {

                    const roomID = new Date().getTime();
                    const newRoom = {
                        roomID: roomID,
                        player1: data,
                        socketID: socket.id
                    };

                    socket.join(roomID);
                    roomEntity[roomID] = newRoom;

                } else {
                    socket.join(roomValue.roomID);

                    socket.to(roomValue.roomID).emit('newGame', {
                        roomID: roomValue.roomID,
                        player1: roomValue.player1,
                        player2: data,
                        isPlayer1: true
                    });

                    socket.emit('newGame', {
                        roomID: roomValue.roomID,
                        player1: roomValue.player1,
                        player2: data,
                        isPlayer1: false
                    });

                    GameHandler.initGame(roomValue.roomID);
                }
                delete roomEntity[roomValue.roomID];
            }
            redis.set("ROOM", JSON.stringify(roomEntity));
        }
    })
};

module.exports.kickRoom = (io, socket, data) => {
    socket.leave(data, null);
    socket.to(data).emit('kickRoom', '');

    return redis.get("ROOM", (err, rawRoom) => {
        if (rawRoom) {
            let roomEntity = JSON.parse(rawRoom);
            delete roomEntity[data];
            redis.set("ROOM", JSON.stringify(roomEntity));
        }
    })
};

module.exports.leaveRoomUnmount = (io, socket, data) => {
    socket.leave(data, null);

    return redis.get("ROOM", (err, rawRoom) => {
        if (rawRoom) {
            let roomEntity = JSON.parse(rawRoom);
            delete roomEntity[data];
            redis.set("ROOM", JSON.stringify(roomEntity));
        }
    })
};