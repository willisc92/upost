// Event Filters Reducers
const postFiltersReducerDefaultState = {
    visible: true,
    sortBy: "ascending_date",
    startDate: null,
    endDate: null
};

export default (state = postFiltersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_VISIBLE_FILTER":
            return {
                ...state,
                visible: action.visible
            };
        case "SORT_BY_ASCENDING_DATE":
            return {
                ...state,
                sortBy: "ascending_date"
            };
        case "SORT_BY_DESCENDING_DATE":
            return {
                ...state,
                sortBy: "descending_date"
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
