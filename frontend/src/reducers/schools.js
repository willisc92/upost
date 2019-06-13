const schoolsDefaultState = { loading: false, error: null, schools: [] };

export default (state = schoolsDefaultState, action) => {
    switch (action.type) {
        case "SCHOOL_START":
            return {
                ...state,
                loading: true
            };
        case "SCHOOL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "SCHOOL_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "SET_SCHOOLS":
            return {
                ...state,
                schools: action.schools
            };
        default:
            return state;
    }
};
