// Post Filters Reducers
const postFiltersReducerDefaultState = {
    text: "",
    community: "",
    sortBy: "name",
    startDate: null,
    endDate: null
};

export default (state = postFiltersReducerDefaultState, action) => {
    switch (action.type) {
        case "RESET_POST_FILTERS":
            return {
                ...postFiltersReducerDefaultState
            };
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        case "SET_COMMUNITY_FILTER":
            return {
                ...state,
                community: action.community
            };
        case "SORT_BY_NAME":
            return {
                ...state,
                sortBy: "name"
            };
        case "SORT_BY_LAST_UPDATED":
            return {
                ...state,
                sortBy: "last_updated"
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
