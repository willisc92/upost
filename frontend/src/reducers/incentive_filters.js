// Incentive Filters Reducers
const incentiveFiltersReducerDefaultState = {
    visible: true,
    sortBy: "date",
    startDate: null,
    endDate: null,
    type: ""
};

export default (state = incentiveFiltersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TYPE_FILTER":
            return {
                ...state,
                type: action.type_filter
            };
        case "SET_VISIBLE_FILTER":
            return {
                ...state,
                visible: action.visible
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: "date"
            };
        case "SORT_BY_TYPE":
            return {
                ...state,
                sortBy: "type"
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
