import axios from 'axios';
import {ActionConstant, SYSTEM_ERROR} from "../utils/Constants";

export const setErrorText = (value) => {
    return {
        type: ActionConstant.SET_ERROR,
        value
    }
};

function callApiStart() {
    return {
        type: ActionConstant.CALL_API_START
    };
}

function editingStart() {
    return {
        type: ActionConstant.EDIT_INFO_START
    };
}

function loginSuccess(user) {
    return {
        type: ActionConstant.LOGIN_SUCCESS,
        user
    };
}

export const register = (user) => {
    return dispatch => {

        dispatch(callApiStart());

        return axios.post(`${process.env.REACT_APP_BACKEND_URL}user/register`, {
            user
        }, {
            timeout: 5000
        }).then(data => data.data)
            .then(data => {
                return dispatch(setErrorText(data.message));
            }).catch(() => dispatch(setErrorText(SYSTEM_ERROR)));
    }
};

export const getUser = () => {
    return dispatch => {

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
                    return dispatch(loginSuccess(data.message));
                }
                return dispatch(setErrorText(data.message));

            }).catch(() => dispatch(setErrorText(SYSTEM_ERROR)));
    }
};

export function logout() {
    localStorage.removeItem("token");
    return {
        type: ActionConstant.LOGOUT
    }
}

export const login = (username, password) => {
    return dispatch => {

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
                    return dispatch(getUser());
                }
                return dispatch(setErrorText(data.message));
            }).catch(() => dispatch(setErrorText(SYSTEM_ERROR)));
    };
};

export const loginWithFacebook = () => {
    return (dispatch) => {

        dispatch(callApiStart());

        window.open(`${process.env.REACT_APP_BACKEND_URL}auth/facebook`,
            "mywindow",
            "location=1,status=1,scrollbars=1, width=700,height=550");

        window.addEventListener('message', function getData(message) {
            const {data} = message;
            if (data.returnCode) {
                window.removeEventListener('message', getData);
                if (data.returnCode === 1) {
                    localStorage.setItem("token", data.token);
                    return dispatch(getUser());
                }
                return dispatch(setErrorText(data.message));
            }
            return null;
        });
        return null;
    };
};

export const loginWithGoogle = () => {
    return (dispatch) => {
        dispatch(callApiStart());

        window.open(`${process.env.REACT_APP_BACKEND_URL}auth/google`,
            "mywindow",
            "location=1,status=1,scrollbars=1, width=700,height=550");

        window.addEventListener('message', function getData(message) {
            const {data} = message;
            if (data.returnCode) {
                window.removeEventListener('message', getData);
                if (data.returnCode === 1) {
                    localStorage.setItem("token", data.token);
                    return dispatch(getUser());
                }
                return dispatch(setErrorText(data.message));
            }
            return null;
        });

        return null;
    };
};

export const updateUserInfo = (userData) => {
    return (dispatch) => {
        dispatch(editingStart());

        return axios.post(`${process.env.REACT_APP_BACKEND_URL}user/update`,
            userData,
            {
                timeout: 20000
            }).then(data => data.data)
            .then(data => {
                if (data.returnCode === 1) {
                    return dispatch(getUser());
                }
                return dispatch(setErrorText(data.message));
            }).catch(() => dispatch(setErrorText(SYSTEM_ERROR)));
    }
};

export const changePassword = (password) => {
    return (dispatch, getState) => {

        const {username} = getState().api.user;

        dispatch(editingStart());

        return axios.post(`${process.env.REACT_APP_BACKEND_URL}user/changepassword`, {
            username,
            password
        }, {
            timeout: 5000
        }).then(data => data.data)
            .then(data => {
                if (data.returnCode === 1) {
                    return dispatch(login(username, password));
                }
                return dispatch(setErrorText(data.message));
            }).catch(() => dispatch(setErrorText(SYSTEM_ERROR)));
    };
};