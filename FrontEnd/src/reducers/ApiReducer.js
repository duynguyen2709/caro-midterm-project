import { ActionConstant } from '../utils/Constants';

const initialState = {
    username: null,
    loggedIn: false,
    isLoading: false,
    errorText: ''
};

export default function apiReducer(state = initialState, action){

    switch (action.type) {
        case ActionConstant.SET_ERROR:
            return {
                ...state,
                errorText: action.value,
                isLoading: false
            };
        case ActionConstant.SET_USERNAME:
            return {
                ...state,
                username: action.username,
                isLoading : false,
                errorText: '',
                loggedIn: true
            };
        case ActionConstant.CALL_API_START:
            return {
                ...state,
                errorText: '',
                isLoading : true
            };
        case ActionConstant.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading : false,
                errorText: '',
                loggedIn: true
            };
        case ActionConstant.LOGOUT:
            return {
                ...initialState
            };

        default :
            return state;
    }
}