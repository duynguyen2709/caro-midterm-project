export const NO_OF_ROW = 20;
export const NO_OF_COL = 20;

export const NUM_TO_WIN = 5;

export const BASE_ROW = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
export const BASE_COL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export const ActionConstant = {
    // GAME
    INIT_BOARD: "INIT_BOARD",
    RESET_BOARD: "RESET_BOARD",
    RESET_TABLE: "RESET_TABLE",
    SET_CURRENT_SELECTED: "SET_CURRENT_SELECTED",
    ON_CLICK_SQUARE: "ON_CLICK_SQUARE",

    // API
    SET_ERROR: "SET_ERROR",
    SET_USERNAME: "SET_USERNAME",
    CALL_API_START: "CALL_API_START",
    EDIT_INFO_START: "EDIT_INFO_START",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGOUT: "LOGOUT",
    UPDATE_INFO: "UPDATE_INFO",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",

    // ONLINE GAME
    JOIN_NEW_GAME: "JOIN_NEW_GAME",
    LEAVE_ROOM: "LEAVE_ROOM",
    NEW_TURN_PLAYED: "NEW_TURN_PLAYED",
    NEW_MESSAGE: "NEW_MESSAGE",
    GAME_ENDED: "GAME_ENDED",
    GAME_DRAW: "GAME_DRAW",
};

export const SYSTEM_ERROR = "Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau";