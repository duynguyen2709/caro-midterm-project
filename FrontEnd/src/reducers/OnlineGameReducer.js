import {ActionConstant} from "../utils/Constants";

const initialState = {
    historyMoves: [],
    roomID: '',
    otherPlayer: {},
    mySymbol: '',
    isMyTurn: true,
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
            };

        case ActionConstant.LEAVE_ROOM:
            return initialState;

        default :
            return state;
    }
}