// Event Filters Reducers
const eventFiltersReducerDefaultState = {
    sortBy: "ascending_date",
    startDate: null,
    endDate: null,
    text: "",
    dayFilter: "all",
    hasIncentive: "all",
    incentiveType: "",
    community: "",
    dietOption: ""
};

export default (state = eventFiltersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_DEFAULT":
            return state;
        case "CLEAR_DATES":
            return {
                ...state,
                startDate: null,
                endDate: null
            };
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
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
        case "SET_DAY_FILTER":
            return {
                ...state,
                dayFilter: action.dayFilter
            };
        case "SET_COMMUNITY_FILTER":
            return {
                ...state,
                community: action.community
            };
        case "SET_HAS_INCENTIVE_FILTER":
            return {
                ...state,
                hasIncentive: action.hasIncentive
            };
        case "SET_INCENTIVE_TYPE_FILTER":
            return {
                ...state,
                incentiveType: action.incentiveType
            };
        case "SET_DIET_OPTION_FILTER":
            return {
                ...state,
                dietOption: action.dietOption
            };
        default:
            return state;
    }
};
