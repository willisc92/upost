// Channels Filters Reducers
const channelsFiltersReducerDefaultState = {
    text: "",
    sortBy: "name",
    startDate: null,
    endDate: null
};

export default (state = channelsFiltersReducerDefaultState, action) => {
    switch (action.type) {
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
