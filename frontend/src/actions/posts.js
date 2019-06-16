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

// START_SET_RANDOM_POSTS
export const startSetRandomPosts = (interest) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.get("random-posts/", {
                params: {
                    interest: interest
                }
            })
                .then((result) => {
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log("error in getting posts for interest", error);
                    reject(error);
                });
        });
    };
};

export const startGetPost = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.get("posts/", {
                params: {
                    post_id: id
                }
            })
                .then((result) => {
                    dispatch(postSuccess());
                    dispatch(setPosts(result.data));
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(postFail(err));
                    reject(err);
                });
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
                    console.log(JSON.stringify(result, null, 2));
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

export const editPost = (id, updates) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.put(`posts/${id}/`, {
                ...updates,
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

export const postFail = (error) => ({
    type: "POST_FAIL",
    error
});

export const postSuccess = () => ({
    type: "POST_SUCCESS"
});
