import {
    postStart,
    setPosts,
    startSetMyPosts,
    startGetPost,
    addPost,
    editPost,
    postFail,
    postSuccess
} from "../../actions/posts";
import posts from "../fixtures/posts";
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const createMockStore = configureMockStore([thunk]);

test("Should return postStart action object", () => {
    const action = postStart();
    expect(action).toEqual({
        type: "POST_START"
    });
});

test("Should return setPosts action object", () => {
    const action = setPosts(posts);
    expect(action).toEqual({
        type: "SET_POSTS",
        posts
    });
});

test("Should return postFail action object", () => {
    const error = "SOME ERROR";
    const action = postFail(error);
    expect(action).toEqual({
        type: "POST_FAIL",
        error
    });
});

test("Should return postSuccess object", () => {
    const action = postSuccess();
    expect(action).toEqual({
        type: "POST_SUCCESS"
    });
});

test("Should make successful API call to set posts and dispath setPosts", async () => {
    localStorage.clear();
    localStorage.setItem("user_id", "123");

    const store = createMockStore({
        posts: {
            token: null,
            error: "",
            posts: []
        }
    });

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: posts
        })
    );

    const expectedActions = [
        { type: "POST_START" },
        { type: "POST_SUCCESS" },
        {
            type: "SET_POSTS",
            posts
        }
    ];

    await store.dispatch(startSetMyPosts());
    expect(store.getActions()).toEqual(expectedActions);
});

test("Should make successful API call to get a post", () => {
    const post_id = 1;

    const store = createMockStore({
        posts: {
            token: null,
            error: "",
            posts: []
        }
    });

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: [posts[0]]
        })
    );

    const expectedActions = [
        { type: "POST_START" },
        { type: "POST_SUCCESS" },
        {
            type: "SET_POSTS",
            posts: [posts[0]]
        }
    ];

    store.dispatch(startGetPost(post_id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test("Should make successful API call to add post", () => {
    localStorage.clear();
    localStorage.setItem("user_id", "123");

    const store = createMockStore({
        posts: {
            token: null,
            error: "",
            posts: []
        }
    });

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({}));
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: [posts[0]]
        })
    );

    const expectedActions = [
        { type: "POST_START" },
        { type: "POST_SUCCESS" },
        { type: "POST_START" },
        { type: "POST_SUCCESS" },
        { type: "SET_POSTS", posts: [posts[0]] }
    ];

    store.dispatch(addPost(posts[0])).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test("Should make successful API call to edit post", () => {
    localStorage.clear();
    localStorage.setItem("user_id", "123");

    const store = createMockStore({
        posts: {
            token: null,
            error: "",
            posts: []
        }
    });

    mockAxios.put.mockImplementationOnce(() => Promise.resolve({}));
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: [posts[1]]
        })
    );

    const expectedActions = [
        { type: "POST_START" },
        { type: "POST_SUCCESS" },
        { type: "POST_START" },
        { type: "POST_SUCCESS" },
        { type: "SET_POSTS", posts: [posts[1]] }
    ];

    store.dispatch(editPost(0, posts[1])).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});
