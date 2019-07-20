const communityDefaultState = {
    loading: false,
    error: null,
    communities: [],
    userCommunities: []
};

export default (state = communityDefaultState, action) => {
    switch (action.type) {
        case "COMMUNITY_START":
            return {
                ...state,
                loading: true
            };
        case "COMMUNITY_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "COMMUNITY_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "SET_COMMUNITIES":
            return {
                ...state,
                communities: action.communities
            };
        case "SET_USER_COMMUNITIES":
            return {
                ...state,
                userCommunities: action.userCommunities
            };
        default:
            return state;
    }
};
