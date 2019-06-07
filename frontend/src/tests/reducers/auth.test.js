import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "../../actions/auth_action_types";
import authReducer from "../../reducers/auth";

test("Should set state from AUTH_START action", () => {
    const action = {
        type: AUTH_START
    };

    const state = authReducer(undefined, action);
    expect(state).toEqual({
        token: null,
        error: null,
        loading: true
    });
});

test("Should set state from AUTH_SUCCESS action", () => {
    const action = {
        type: AUTH_SUCCESS,
        token: 123
    };

    const state = authReducer(
        {
            token: null,
            error: null,
            loading: true
        },
        action
    );

    expect(state).toEqual({
        token: 123,
        error: null,
        loading: false
    });
});

test("Should set state from AUTH_FAIL action", () => {
    const action = {
        type: AUTH_FAIL,
        error: "ERROR"
    };

    const state = authReducer(
        {
            token: null,
            error: null,
            loading: true
        },
        action
    );

    expect(state).toEqual({
        token: null,
        error: "ERROR",
        loading: false
    });
});

test("Should set state from AUTH_LOGOUT action", () => {
    const action = {
        type: AUTH_LOGOUT
    };

    const state = authReducer(
        {
            token: 123,
            error: null,
            loading: false
        },
        action
    );

    expect(state).toEqual({
        token: null,
        error: null,
        loading: false
    });
});
