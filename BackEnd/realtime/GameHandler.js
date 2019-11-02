const redis = require('../utilities/redis');
const gameUtil = require('../utilities/gameUtil');

module.exports.initGame = (roomID) => {

    const initialRoomState = {
        squares: Array(20).fill(Array(20).fill(null)),
        isXNext: true,
        totalChecked: 0,
        win: false,
        historyMoves: [],
        historySquares: []
    };

    const initialChat = [];

    redis.set('GAME_' + roomID, JSON.stringify(initialRoomState));
    redis.set('MESSAGE_' + roomID, JSON.stringify(initialChat));
};

module.exports.playTurn = (io, data) => {
    return redis.get('GAME_' + data.roomID, (err, raw) => {
        if (!raw || err) {
            console.error('Null Game Data for room: ' + data.roomID);
            io.in(data.roomID).emit('kickRoom', '');
            return;
        }

        const gameState = JSON.parse(raw);

        const currentSymbol = data.isPlayer1 ? 'X' : 'O';
        const elementClicked = {
            key: gameState.totalChecked + 1,
            id: gameState.totalChecked + 1,
            symbol: currentSymbol,
            row: data.i + 1,
            column: data.j + 1
        };

        gameState.historyMoves.push(elementClicked);
        gameState.squares[data.i][data.j] = currentSymbol;
        gameState.historySquares.push(gameState.squares);
        gameState.totalChecked = gameState.totalChecked + 1;
        gameState.isXNext = !gameState.isXNext;

        const checkWin = gameUtil.checkWinCondition(gameState.squares, data.i, data.j);
        if (checkWin) {
            gameState.winArray = checkWin.winArray;
            gameState.winPlayer = currentSymbol;
            gameState.win = true;
        } else {
            gameState.win = false;
        }

        redis.set('GAME_' + data.roomID, JSON.stringify(gameState));
        io.in(data.roomID).emit('newTurn', gameState);
    })
};


module.exports.sendMessage = (io, data) => {
    return redis.get('MESSAGE_' + data.roomID, (err, raw) => {
        if (!raw || err) {
            console.error('Null Message Data for room: ' + data.roomID);
            return;
        }

        const messages = JSON.parse(raw);
        messages.push(data);
        console.log(messages);

        redis.set('MESSAGE_' + data.roomID, JSON.stringify(messages));
        io.in(data.roomID).emit('newMessage', messages);
    })
};