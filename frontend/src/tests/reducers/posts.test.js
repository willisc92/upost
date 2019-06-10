import postsReducer from "../../reducers/posts";
import posts from "../fixtures/posts";

const postsDefaultState = { error: "", loading: false, posts: [] };

test("Should alter state from POST_START action object", () => {
    const action = {
        type: "POST_START"
    };

    const state = postsReducer(undefined, action);
    expect(state).toEqual({
        ...postsDefaultState,
        error: "",
        loading: true
    });
});

test("Should alter state from SET_POSTS action object", () => {
    const action = {
        type: "SET_POSTS",
        posts
    };

    const state = postsReducer(undefined, action);
    expect(state).toEqual({
        ...postsDefaultState,
        posts
    });
});

test("Should alter state from POST_FAIL action object", () => {
    const error = "Some error";
    const action = {
        type: "POST_FAIL",
        error
    };

    const prevState = { error: "", loading: true, posts: [] };
    const state = postsReducer(prevState, action);
    expect(state).toEqual({
        ...prevState,
        error,
        loading: false
    });
});

test("Should alter state from POST_SUCCESS action object", () => {
    const action = {
        type: "POST_SUCCESS"
    };

    const prevState = { error: "", loading: true, posts: [] };
    const state = postsReducer(prevState, action);
    expect(state).toEqual({
        ...prevState,
        error: "",
        loading: false
    });
});
