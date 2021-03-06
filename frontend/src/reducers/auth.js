import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "../actions/auth_action_types";

const authDefaultState = {
    token: null,
    error: null,
    loading: false,
    username: null
};

export default (state = authDefaultState, action) => {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                token: action.token
            };
        case AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};
