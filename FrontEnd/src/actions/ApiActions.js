import axios from 'axios';
import {ActionConstant} from "../utils/Constants";

export const setErrorText = (value) => {
    return {
        type: ActionConstant.SET_ERROR,
        value
    }
};

function setUsername(username) {
    return {
        type: ActionConstant.SET_USERNAME,
        username
    }
}

function callApiStart() {
    return {
        type: ActionConstant.CALL_API_START
    };
}

function loginSuccess() {
    return {
        type: ActionConstant.LOGIN_SUCCESS
    };
}

export const register = (user) => {
    return (dispatch, getState) => {
        if (getState().api.isLoading)
            return null;

        dispatch(callApiStart());

        return axios.post(`${process.env.REACT_APP_BACKEND_URL}user/register`, {
            user
        }, {
            timeout: 5000
        }).then(data => data.data)
            .then(data => {
                dispatch(setErrorText(data.message));
            }).catch(() => dispatch(setErrorText('Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau')));
    }
};

export const getUsername = () => {
    return (dispatch, getState) => {
        const {username} = getState().api;
        if (username != null && username !== '')
            return null;

        const token = localStorage.getItem("token");
        dispatch(callApiStart());

        return axios.get(`${process.env.REACT_APP_BACKEND_URL}me`,
            {
                headers: {"Authorization": `Bearer ${token}`},
                timeout: 5000
            })
            .then(data => data.data)
            .then(data => {
                if (data.returnCode === 1) {
                    dispatch(setUsername(data.message));
                } else {
                    dispatch(setErrorText(data.message));
                }
            }).catch(() => dispatch(setErrorText('Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau')));
    }
};

export function logout() {
    localStorage.removeItem("token");
    return {
        type: ActionConstant.LOGOUT
    }
}

export const login = (username, password) => {
    return (dispatch, getState) => {
        if (getState().api.isLoading)
            return null;

        dispatch(callApiStart());

        return axios.post(`${process.env.REACT_APP_BACKEND_URL}user/login`, {
            username,
            password
        }, {
            timeout: 5000
        }).then(data => data.data)
            .then(data => {
                if (data.returnCode === 1) {
                    localStorage.setItem("token", data.token);
                    dispatch(loginSuccess());
                } else {
                    dispatch(setErrorText(data.message));
                }
            }).catch(() => dispatch(setErrorText('Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau')));
    };
};