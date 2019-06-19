const incentiveTypeDefaultState = { loading: false, error: null, incentiveTypes: [] };

export default (state = incentiveTypeDefaultState, action) => {
    switch (action.type) {
        case "INCENTIVE_TYPE_START":
            return {
                ...state,
                loading: true
            };
        case "INCENTIVE_TYPE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "INCENTIVE_TYPE_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "SET_INCENTIVE_TYPES":
            return {
                ...state,
                incentiveTypes: action.incentiveTypes
            };
        case "CLEAR_INCENTIVE_TYPES":
            return {
                ...state,
                incentiveTypes: []
            };
        default:
            return state;
    }
};
