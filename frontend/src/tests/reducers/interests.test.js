import interestReducer from "../../reducers/interests";

test("Should set interests from action object", () => {
    const interests = ["Interest 1", "Interest 2", "Interest 3"];

    const action = {
        type: "SET_USER_INTERESTS",
        userInterests: interests
    };

    const state = interestReducer(undefined, action);
    expect(state).toEqual({ userInterests: interests });
});

test("Should set interests from action object", () => {
    const prev_state = { userInterests: ["Interest 1", "Interest 2", "Interest 3"] };
    const new_interests = ["Interest 4", "Interest 5", "Interest 6"];

    const action = {
        type: "EDIT_USER_INTERESTS",
        userInterests: new_interests
    };

    const state = interestReducer(prev_state, action);
    expect(state).toEqual({ userInterests: new_interests });
});
