import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "./auth_action_types";
import API from "../utils/API";

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
    return {
        type: AUTH_LOGOUT
    };
};

export const authLogin = (username, password) => {
    return (dispatch) => {
        dispatch(authStart());
        API.post("rest-auth/login", {
            username,
            password
        })
            .then((res) => {
                const token = res.data.key;
                const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("expirationTime", expirationTime);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(expirationTime(3600)));
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    };
};

export const authSignup = (user) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.post("accounts/", user)
                .then((res) => {
                    /*
                    const token = res.data.key;
                    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                    localStorage.setItem("token", token);
                    localStorage.setItem("expirationDate", expirationDate);
                    dispatch(authSuccess(token));
                    dispatch(checkAuthTimeout(expirationTime(3600)));
                    */
                    resolve(true);
                })
                .catch((error) => {
                    dispatch(authFail(error.response.request.response));
                    reject(error.response.request.response);
                });
        });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationTime"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
