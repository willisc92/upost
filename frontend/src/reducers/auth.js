import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "../actions/auth_action_types";

const authDefaultState = {
    token: null,
    error: null,
    loading: false,
};

export default (state = authDefaultState, action) => {
    switch (action.type) {
        case AUTH_START:
            return {
                error: null,
                loading: true
            };
        case AUTH_SUCCESS:
            return {
                error: null,
                loading: false,
                token: action.token
            };
        case AUTH_FAIL:
            return {
                error: action.error,
                loading: false
            };
        case AUTH_LOGOUT:
            return {
                token: null
            };
        default:
            return state;
    }
};
