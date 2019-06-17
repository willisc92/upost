// Post Reducers
export const postsDefaultState = { error: null, loading: false, posts: [], interestRandomPosts: [] };

export default (state = postsDefaultState, action) => {
    switch (action.type) {
        case "POST_START":
            return {
                ...state,
                error: null,
                loading: true
            };
        case "SET_POSTS":
            return {
                ...state,
                posts: action.posts
            };
        case "POST_FAIL":
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case "POST_SUCCESS":
            return {
                ...state,
                error: null,
                loading: false
            };
        case "SET_INTEREST_RANDOM_POSTS":
            return {
                ...state,
                interestRandomPosts: []
            };
        case "ADD_INTEREST_RANDOM_POSTS":
            return {
                ...state,
                interestRandomPosts: [...state.interestRandomPosts, action.interestPosts]
            };
        default:
            return state;
    }
};
