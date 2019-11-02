import {ActionConstant} from "../utils/Constants";

export const joinNewGame = (room) => {
    return {
        type: ActionConstant.JOIN_NEW_GAME,
        room
    }
};

export const leaveRoom = () => {
    return {
        type: ActionConstant.LEAVE_ROOM,
    }
};

export const onNewTurnPlayed = (data) => {
    return {
        type: ActionConstant.NEW_TURN_PLAYED,
        data
    }
};