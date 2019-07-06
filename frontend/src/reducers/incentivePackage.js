const incentivePackageDefaultState = { loading: false, error: null, incentivePackage: [] };

export default (state = incentivePackageDefaultState, action) => {
    switch (action.type) {
        case "INCENTIVE_PACKAGE_START":
            return {
                ...state,
                loading: true
            };
        case "INCENTIVE_PACKAGE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "INCENTIVE_PACKAGE_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "SET_INCENTIVE_PACKAGE":
            return {
                ...state,
                incentivePackage: action.incentivePackage
            };
        case "CLEAR_INCENTIVE_PACKAGE":
            return {
                ...state,
                incentivePackage: []
            };
        default:
            return state;
    }
};
