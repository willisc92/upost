import {
    setUserInterests,
    startSetUserInterests,
    editUserInterests,
    startEditUserInterests,
    getAllInterests
} from "../../actions/interests";
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import interests from "../fixtures/interests";

const createMockStore = configureMockStore([thunk]);

test("Should return setUserInterests action object", () => {
    const action = setUserInterests(interests);
    expect(action).toEqual({
        type: "SET_USER_INTERESTS",
        userInterests: interests
    });
});

test("Should return editUserInterests action object", () => {
    const action = editUserInterests(interests);
    expect(action).toEqual({
        type: "EDIT_USER_INTERESTS",
        userInterests: interests
    });
});

test("Should dispatch API call and setUserInterests", () => {
    const store = createMockStore({
        userInterests: []
    });

    localStorage.clear();
    localStorage.setItem("user_id", "123");

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: { interests }
        })
    );

    store.dispatch(startSetUserInterests()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_USER_INTERESTS",
            userInterests: interests
        });
    });
});

test("Should get all interests from API call.", () => {
    const store = createMockStore({
        userInterests: []
    });

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: interests
        })
    );

    store.dispatch(getAllInterests()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_USER_INTERESTS",
            userInterests: interests
        });
    });
});

test("Should make put request using startEditUserInterests", () => {
    const store = createMockStore({
        userInterests: []
    });

    localStorage.clear();
    localStorage.setItem("user_id", "123");

    mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
            data: { interests }
        })
    );

    store.dispatch(startEditUserInterests(interests)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_USER_INTERESTS",
            userInterests: interests
        });
    });
});
