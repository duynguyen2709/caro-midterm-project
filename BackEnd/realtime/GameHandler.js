const redis = require('../utilities/redis');

module.exports.initGame = (roomID) => {

    const initialRoomState = {
        squares: Array(20).fill(Array(20).fill(null)),
        isXNext: true,
        totalChecked: 0,
        win: false,
        historyMoves: [],
        historySquares: []
    };

    redis.set('GAME_' + roomID, JSON.stringify(initialRoomState));
};

module.exports.playTurn = (io, data) => {
    return redis.get('GAME_' + data.roomID, (err, raw) => {
        if (!raw || err){
            console.error('Null Game Data for room: ' + data.roomID);
            io.in(data.roomID).emit('kickRoom','');
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

        redis.set('GAME_' + data.roomID, JSON.stringify(gameState));
        console.log(gameState);
        io.in(data.roomID).emit('newTurn', gameState);
    })
};
