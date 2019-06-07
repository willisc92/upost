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

const createMockStore = configureMockStore([thunk]);

test("Should return setUserInterests action object", () => {
    const userInterests = ["Interest 1", "Interest 2", "Interest 3"];
    const action = setUserInterests(userInterests);
    expect(action).toEqual({
        type: "SET_USER_INTERESTS",
        userInterests
    });
});

test("Should return editUserInterests action object", () => {
    const userInterests = ["Interest 1", "Interest 2", "Interest 3"];
    const action = editUserInterests(userInterests);
    expect(action).toEqual({
        type: "EDIT_USER_INTERESTS",
        userInterests
    });
});

test("Should dispatch API call and setUserInterests", () => {
    const store = createMockStore({
        userInterests: []
    });

    localStorage.clear();
    localStorage.setItem("user_id", "123");

    const interests = ["Interest 1", "Interest 2", "Interest 3"];

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: {
                interests
            }
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
