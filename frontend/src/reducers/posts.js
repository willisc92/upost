// Post Reducers
const postsDefaultState = { error: "", loading: false, posts: [] };

export default (state = postsDefaultState, action) => {
    switch (action.type) {
        case "POST_START":
            return {
                ...state,
                error: "",
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
                error: "",
                loading: false
            };
        default:
            return state;
    }
};
