const dietOptionsDefaultState = { loading: false, error: null, dietOptions: [] };

export default (state = dietOptionsDefaultState, action) => {
    switch (action.type) {
        case "DIET_OPTIONS_START":
            return {
                ...state,
                loading: true
            };
        case "DIET_OPTIONS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "DIET_OPTIONS_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "SET_DIET_OPTIONS":
            return {
                ...state,
                dietOptions: action.dietOptions
            };
        case "CLEAR_DIET_OPTIONS":
            return {
                ...state,
                dietOptions: []
            };
        default:
            return state;
    }
};
