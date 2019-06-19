import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "./auth_action_types";
import API from "../utils/API";
import moment from "moment";

export const authStart = () => ({
    type: AUTH_START
});

export const authSuccess = (token) => ({
    type: AUTH_SUCCESS,
    token
});

export const authFail = (error) => ({
    type: AUTH_FAIL,
    error
});

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    return {
        type: AUTH_LOGOUT
    };
};

export const authLogin = (username, password) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(authStart());
            API.post("login/", {
                username,
                password
            })
                .then((res) => {
                    const token = res.data.token;
                    const expirationDate = moment() + 3600 * 1000;
                    localStorage.setItem("token", token);
                    localStorage.setItem("expirationDate", expirationDate);
                    localStorage.setItem("first_name", res.data.first_name);
                    localStorage.setItem("last_name", res.data.last_name);
                    localStorage.setItem("user_id", res.data.user_id);
                    localStorage.setItem("user_name", res.data.username);
                    dispatch(authSuccess(token));
                    dispatch(checkAuthTimeout(3600));
                    resolve(true);
                })
                .catch((err) => {
                    dispatch(authFail(err));
                    reject(err);
                });
        });
    };
};

export const authSignup = (user) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.post("accounts/", user)
                .then((res) => {
                    const token = res.data.token;
                    const expirationDate = moment() + 3600 * 1000;
                    localStorage.setItem("token", token);
                    localStorage.setItem("first_name", res.data.first_name);
                    localStorage.setItem("last_name", res.data.last_name);
                    localStorage.setItem("user_id", res.data.user_id);
                    localStorage.setItem("expirationDate", expirationDate);
                    localStorage.setItem("user_name", res.data.username);
                    dispatch(authSuccess(token));
                    dispatch(checkAuthTimeout(3600));
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(authFail(error.response.request.response));
                    reject(error.response.request.response);
                });
        });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!!token) {
            const expirationDate = moment(parseInt(localStorage.getItem("expirationDate"), 10));
            if (expirationDate <= moment()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate - moment()) / 1000));
            }
        } else {
            dispatch(logout());
        }
    };
};
