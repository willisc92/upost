import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "../../actions/auth_action_types";
import {
    authStart,
    authSuccess,
    authFail,
    checkAuthTimeout,
    logout,
    authLogin,
    authCheckState,
    authSignup
} from "../../actions/auth";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAxios from "axios";
import moment from "moment";

const createMockStore = configureMockStore([thunk]);
jest.useFakeTimers();

beforeEach(() => {
    localStorage.clear();
});

test("Should generate authStart action object", () => {
    const action = authStart();
    expect(action).toEqual({
        type: AUTH_START
    });
});

test("Should generate authLogout action object", () => {
    localStorage.setItem("token", 123);
    localStorage.setItem("expirationDate", moment());
    localStorage.setItem("first_name", "Willis");
    localStorage.setItem("last_name", "Cheung");
    localStorage.setItem("user_id", 123);
    localStorage.setItem("user_name", "willisc92");
    const action = logout();
    expect(action).toEqual({
        type: AUTH_LOGOUT
    });
    expect(localStorage.getItem("token")).toBeFalsy();
    expect(localStorage.getItem("expirationDate")).toBeFalsy();
    expect(localStorage.getItem("first_name")).toBeFalsy();
    expect(localStorage.getItem("last_name")).toBeFalsy();
    expect(localStorage.getItem("user_id")).toBeFalsy();
    expect(localStorage.getItem("user_name")).toBeFalsy();
});

test("Should generate authSuccess action object", () => {
    const token = 123;
    const action = authSuccess(token);
    expect(action).toEqual({
        type: AUTH_SUCCESS,
        token
    });
});

test("Should generate authFail action object", () => {
    const error = "error";
    const action = authFail(error);
    expect(action).toEqual({
        type: AUTH_FAIL,
        error
    });
});

test("Should generate checkAuthTimeout action object", () => {
    const store = createMockStore({
        auth: {
            token: 123,
            error: null,
            loading: false
        }
    });

    store.dispatch(checkAuthTimeout(0));
    jest.runAllTimers();
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: AUTH_LOGOUT });
});

test("Should checkAuthState when localstorage has no token", () => {
    const store = createMockStore({
        auth: {
            token: null,
            error: null,
            loading: false
        }
    });

    store.dispatch(authCheckState());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: AUTH_LOGOUT });
});

test("Should checkAuthState when localstorage has a token and is valid", () => {
    const token = 123;
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", moment(3600 * 1000));

    const store = createMockStore({
        auth: {
            token: null,
            error: null,
            loading: false
        }
    });

    store.dispatch(authCheckState());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: AUTH_SUCCESS, token: localStorage.getItem("token") });
});

test("Should checkAuthState when localstorage has a token, but is expired ", () => {
    const token = 123;
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", moment(-3600 * 1000));

    const store = createMockStore({
        auth: {
            token: null,
            error: null,
            loading: false
        }
    });

    store.dispatch(authCheckState());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: AUTH_LOGOUT });
});

test("Should perform valid authlogin", async () => {
    const store = createMockStore({
        auth: {
            token: null,
            error: null,
            loading: false
        }
    });

    mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
            data: {
                token: 123,
                first_name: "Willis",
                last_name: "Cheung",
                username: "willisc92",
                user_id: 10056884
            }
        })
    );

    const expectedActions = [{ type: AUTH_START }, { type: AUTH_SUCCESS, token: 123 }];

    await store.dispatch(authLogin("username", "password"));
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem("token")).toEqual("123");
    expect(localStorage.getItem("expirationDate")).toEqual((moment() + 3600 * 1000).toString());
    expect(localStorage.getItem("first_name")).toEqual("Willis");
    expect(localStorage.getItem("last_name")).toEqual("Cheung");
    expect(localStorage.getItem("user_name")).toEqual("willisc92");
    expect(localStorage.getItem("user_id")).toEqual("10056884");
});
