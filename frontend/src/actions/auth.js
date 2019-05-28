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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expirationDate");
    return {
        type: AUTH_LOGOUT
    };
};

export const authLogin = (username, password) => {
    return (dispatch) => {
        dispatch(authStart());
        API.post("login/", {
            username,
            password
        })
            .then((res) => {
                console.log(res);
                const token = res.data.token;
                const first_name = res.data.first_name;
                const last_name = res.data.last_name;
                const user_id = res.data.user_id;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("first_name", first_name);
                localStorage.setItem("last_name", last_name);
                localStorage.setItem("user_id", user_id);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch((err) => {
                dispatch(authFail(err.response.statusText));
            });
    };
};

// export const authSignup = (username, email, password1, password2) => {
//     return (dispatch) => {
//         dispatch(authStart());
//         API.post("rest-auth/registration/", {
//             username,
//             email,
//             password1,
//             password2
//         })
//             .then((res) => {
//                 const token = res.data.key;
//                 const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("expirationDate", expirationDate);
//                 dispatch(authSuccess(token));
//                 dispatch(checkAuthTimeout(3600));
//             })
//             .catch((err) => {
//                 dispatch(authFail(err));
//             });
//     };
// };

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
