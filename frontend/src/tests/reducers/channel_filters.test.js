import postFiltersReducer from "../../reducers/post_filters";
import moment from "moment";

const postFiltersReducerDefaultState = {
    text: "",
    visible: true,
    sortBy: "name",
    startDate: null,
    endDate: null
};

test("Should manipulate state from SET_TEXT_FILTER action object", () => {
    const text = "NEW TEXT FILTER";

    const action = {
        type: "SET_TEXT_FILTER",
        text
    };

    const state = postFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...postFiltersReducerDefaultState,
        text
    });
});

test("Should manipulate state from SET_VISIBLE_FILTER action object", () => {
    const visible = false;

    const action = {
        type: "SET_VISIBLE_FILTER",
        visible
    };

    const state = postFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...postFiltersReducerDefaultState,
        visible
    });
});

test("Should manipulate state from SORT_BY_NAME action object", () => {
    const sortBy = "name";

    const action = {
        type: "SORT_BY_NAME"
    };

    const prevState = {
        text: "",
        visible: true,
        sortBy: "date",
        startDate: null,
        endDate: null
    };

    const state = postFiltersReducer(prevState, action);
    expect(state).toEqual({
        ...prevState,
        sortBy
    });
});

test("Should manipulate state from SORT_BY_DATE action object", () => {
    const sortBy = "date";

    const action = {
        type: "SORT_BY_DATE"
    };

    const state = postFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...postFiltersReducerDefaultState,
        sortBy
    });
});

test("Should manipulate state from SET_START_DATE action object", () => {
    const startDate = moment(0);

    const action = {
        type: "SET_START_DATE",
        startDate
    };

    const state = postFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...postFiltersReducerDefaultState,
        startDate
    });
});

test("Should manipulate state from SET_END_DATE action object", () => {
    const endDate = moment(0);

    const action = {
        type: "SET_END_DATE",
        endDate
    };

    const state = postFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...postFiltersReducerDefaultState,
        endDate
    });
});
