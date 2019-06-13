// Post Reducers
export const postsDefaultState = { error: null, loading: false, posts: [] };

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
        default:
            return state;
    }
};
