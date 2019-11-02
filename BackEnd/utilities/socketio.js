const sockIO = require('../app').sockIO;
const RoomHandler = require('../realtime/RoomHandler');
const GameHandler = require('../realtime/GameHandler');

sockIO.on('connection', function (socket) {

    socket.on('findPlayer', function (data) {
        RoomHandler.findPlayer(sockIO, socket, data);
    });

    socket.on('leaveRoom', function (data) {
        RoomHandler.kickRoom(sockIO, socket, data);
    });

    socket.on('playTurn', function (data) {
        GameHandler.playTurn(sockIO, data);
    });

    /**
     * Connect the Player 2 to the room he requested. Show error if room full.
     */
    socket.on('joinGame', function (data) {
        const room = sockIO.nsps['/'].adapter.rooms[data.room];
        if (room && room.length === 1) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', {
                name: data.name,
                room: data.room
            })
        } else {
            socket.emit('err', {
                message: 'Sorry, The room is full!'
            });
        }
    });

    /**
     * Handle the turn played by either player and notify the other.
     */
    socket.on('playTurn', function (data) {
        socket.broadcast.to(data.room).emit('turnPlayed', {
            tile: data.tile,
            room: data.room
        });
    });

    /**
     * Notify the players about the victor.
     */
    socket.on('gameEnded', function (data) {
        socket.broadcast.to(data.room).emit('gameEnd', data);
    });
});

module.exports = sockIO;