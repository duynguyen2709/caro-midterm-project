import {ActionConstant} from '../utils/Constants';

const initialState = {
    user: null,
    loggedIn: false,
    isLoading: false,
    isEditing: false,
    errorText: ''
};

export default function apiReducer(state = initialState, action) {

    switch (action.type) {
        case ActionConstant.SET_ERROR:
            return {
                ...state,
                errorText: action.value,
                isLoading: false,
                isEditing: false,
            };
        case ActionConstant.CALL_API_START:
            return {
                ...state,
                errorText: '',
                isLoading: true,
                isEditing: false,
            };
        case ActionConstant.EDIT_INFO_START:
            return {
                ...state,
                errorText: '',
                isLoading: true,
                isEditing: true
            };
        case ActionConstant.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoading: false,
                isEditing: false,
                errorText: '',
                loggedIn: true
            };
        case ActionConstant.LOGOUT:
            return initialState;
        default :
            return state;
    }
}