import channelFiltersReducer from "../../reducers/channel_filters";
import moment from "moment";

const channelsFiltersReducerDefaultState = {
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

    const state = channelFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...channelsFiltersReducerDefaultState,
        text
    });
});

test("Should manipulate state from SET_VISIBLE_FILTER action object", () => {
    const visible = false;

    const action = {
        type: "SET_VISIBLE_FILTER",
        visible
    };

    const state = channelFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...channelsFiltersReducerDefaultState,
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

    const state = channelFiltersReducer(prevState, action);
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

    const state = channelFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...channelsFiltersReducerDefaultState,
        sortBy
    });
});

test("Should manipulate state from SET_START_DATE action object", () => {
    const startDate = moment(0);

    const action = {
        type: "SET_START_DATE",
        startDate
    };

    const state = channelFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...channelsFiltersReducerDefaultState,
        startDate
    });
});

test("Should manipulate state from SET_END_DATE action object", () => {
    const endDate = moment(0);

    const action = {
        type: "SET_END_DATE",
        endDate
    };

    const state = channelFiltersReducer(undefined, action);
    expect(state).toEqual({
        ...channelsFiltersReducerDefaultState,
        endDate
    });
});
