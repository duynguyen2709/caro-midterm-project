import {ActionConstant} from "../utils/Constants";

const initialState = {
    squares: Array(20).fill(Array(20).fill(null)),
    historyMoves: [],
    roomID: '',
    otherPlayer: {},
    mySymbol: '',
    isMyTurn: true,
    isPlayer1: true,
    totalChecked: 0,
};

export default function onlineGameReducer(state = initialState, action) {

    switch (action.type) {

        case ActionConstant.JOIN_NEW_GAME:
            return {
                ...state,
                roomID: action.room.roomID,
                otherPlayer: (action.room.isPlayer1) ? action.room.player2 : action.room.player1,
                mySymbol: action.room.isPlayer1 ? "X" : "O",
                isMyTurn: action.room.isPlayer1,
                isPlayer1: action.room.isPlayer1
            };

        case ActionConstant.LEAVE_ROOM:
            return initialState;

        case ActionConstant.NEW_TURN_PLAYED:
            return {
                ...state,
                squares: action.data.squares,
                historyMoves: action.data.historyMoves,
                totalChecked: action.data.totalChecked,
                isMyTurn: (action.data.isXNext && state.mySymbol === 'X') ||
                    (!action.data.isXNext && state.mySymbol === 'O')
            };

        default :
            return state;
    }
}