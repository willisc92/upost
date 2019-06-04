import API from "../utils/API";

export const postStart = () => ({
    type: "POST_START"
});

// SET_POSTS
export const setPosts = (posts) => ({
    type: "SET_POSTS",
    posts
});

// START_SET_POSTS
export const startSetMyPosts = () => {
    return (dispatch) => {
        dispatch(postStart());
        API.get("posts/", {
            params: {
                user: localStorage.getItem("user_id")
            }
        })
            .then((result) => {
                dispatch(postSuccess());
                dispatch(setPosts(result.data));
            })
            .catch((err) => {
                dispatch(postFail(err));
            });
    };
};

export const startGetPost = (id) => {
    return (dispatch) => {
        dispatch(postStart());
        API.get("posts/", {
            params: {
                post_id: id
            }
        })
            .then((result) => {
                dispatch(postSuccess());
                dispatch(setPosts(result.data));
            })
            .catch((err) => {
                dispatch(postFail(err));
            });
    };
};

export const addPost = (post) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.post(`posts/`, {
                ...post,
                user: localStorage.getItem("user_id")
            })
                .then((result) => {
                    dispatch(postSuccess());
                    dispatch(startSetMyPosts());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(postFail(err));
                    reject(err);
                });
        });
    };
};

export const editPost = (id, updates, channel_id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.put(`posts/${id}/`, {
                ...updates,
                user: localStorage.getItem("user_id"),
                channel: channel_id
            })
                .then(() => {
                    dispatch(postSuccess());
                    dispatch(startSetPosts());
                    resolve(true);
                })
                .catch((err) => {
                    dispatch(postFail(err));
                    reject(err);
                });
        });
    };
};

export const postFail = (error) => ({
    type: "POST_FAIL",
    error
});

export const postSuccess = () => ({
    type: "POST_SUCCESS"
});
