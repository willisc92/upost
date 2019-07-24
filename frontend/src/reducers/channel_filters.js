// Channels Filters Reducers
const channelsFiltersReducerDefaultState = {
    text: "",
    sortBy: "name",
    startDate: null,
    endDate: null
};

export default (state = channelsFiltersReducerDefaultState, action) => {
    switch (action.type) {
        case "RESET_CHANNEL_FILTERS":
            return {
                ...channelsFiltersReducerDefaultState
            };
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        case "SORT_BY_NAME":
            return {
                ...state,
                sortBy: "name"
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: "date"
            };
        case "SORT_BY_LAST_UPDATED":
            return {
                ...state,
                sortBy: "last_updated"
            };
        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            };
        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};
