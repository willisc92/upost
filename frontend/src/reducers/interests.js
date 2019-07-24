// Interests Reducers
const interestsDefaultState = { interests: [], userInterests: [] };

export default (state = interestsDefaultState, action) => {
    switch (action.type) {
        case "SET_INTERESTS":
            return {
                ...state,
                interests: action.interests
            };
        case "SET_USER_INTERESTS":
            return {
                ...state,
                userInterests: action.userInterests
            };
        default:
            return state;
    }
};
