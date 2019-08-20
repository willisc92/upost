import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "./auth_action_types";
import API from "../utils/API";
import moment from "moment";
import { setAuthToken } from "../utils/API";
import { client_id } from "../utils/localAPIConfig";

export const authStart = () => ({
    type: AUTH_START
});

export const exchangeGoogleToken = (googleToken) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            localStorage.setItem("googleToken", googleToken);
            dispatch(authStart());
            API.post("auth/convert-token/", {
                client_id,
                grant_type: "convert_token",
                backend: "google-oauth2",
                token: googleToken
            })
                .then((res) => {
                    const token = res.data.access_token;
                    const expirationDate = moment() + res.data.expires_in * 1000;
                    localStorage.setItem("token", token);
                    localStorage.setItem("expirationDate", expirationDate);
                    setAuthToken(token);
                    getCurrentUser()
                        .then(() => {
                            dispatch(authSuccess(token));
                            dispatch(checkAuthTimeout(3600));
                            resolve(true);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(authFail({ error: "Error in token exchange, try again later." }));
                    reject(err);
                });
        });
    };
};

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
    if (!!localStorage.getItem("token")) {
        API.post("auth/revoke-token/", {
            client_id,
            token: localStorage.getItem("token")
        })
            .then((res) => {})
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

    localStorage.clear();
    setAuthToken();

    return {
        type: AUTH_LOGOUT
    };
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        API.get("me/")
            .then((res) => {
                localStorage.setItem("first_name", res.data.first_name);
                localStorage.setItem("last_name", res.data.last_name);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("user_name", res.data.username);
                localStorage.setItem("user_id", res.data.id);
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const authLogin = (username, password) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(authStart());
            API.post("auth/token", {
                username,
                password,
                client_id,
                grant_type: "password"
            })
                .then((res) => {
                    const token = res.data.access_token;
                    const expirationDate = moment() + res.data.expires_in * 1000;
                    localStorage.setItem("token", token);
                    localStorage.setItem("expirationDate", expirationDate);
                    setAuthToken(token);
                    getCurrentUser()
                        .then(() => {
                            dispatch(authSuccess(token));
                            dispatch(checkAuthTimeout(3600));
                            resolve(true);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    dispatch(authFail({ error: err.response.data.error_description }));
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
                    localStorage.setItem("username", user.username);
                    resolve(res);
                })
                .catch((error) => {
                    let message = error.response.data;
                    if (!!message.non_field_errors) {
                        message = { email: ["A user with that email already exists"] };
                        dispatch(authFail(message));
                        reject(message);
                    } else {
                        dispatch(authFail(message));
                        reject(message);
                    }
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

export const passwordResetRequest = (email) => {
    return new Promise((resolve, reject) => {
        API.post("password_reset/", {
            email
        })
            .then((result) => {
                localStorage.setItem("email", email);
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const passwordResetConfirm = (token, password) => {
    return new Promise((resolve, reject) => {
        API.post("password_reset/confirm/", {
            token,
            password
        })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const resendActivationEmail = () => {
    API.get("activation-email/", {
        params: { username: localStorage.getItem("username") }
    });
};
