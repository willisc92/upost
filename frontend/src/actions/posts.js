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

/*
SET_INTEREST_RANDOM_POSTS
resets the interestRandomPosts in store to be an empty array
*/
export const setInterestRandomPosts = () => {
    return { type: "SET_INTEREST_RANDOM_POSTS " };
};

/*
ADD_INTEREST_RANDOM_POSTS
adds a new interest and associated random posts to interestRandomPosts in store
*/
export const addInterestRandomPosts = (interestPosts) => {
    return { type: "ADD_INTEREST_RANDOM_POSTS", interestPosts };
};

/*
START_SET_INTEREST_RANDOM_POSTS
Gets and stores interest and random posts for each interest provided

@param interests An array of interest objects
*/
export const startSetInterestRandomPosts = (interests) => {
    return (dispatch) => {
        dispatch(postStart());
        dispatch(setInterestRandomPosts(dispatch));
        for (let i = 0; i < interests.length; i++) {
            API.get("random-posts/", {
                params: {
                    interest: interests[i].interest_tag
                }
            }).then((result) => {
                if (result.data.length > 0) {
                    dispatch(addInterestRandomPosts({ tag: interests[i].interest_tag, posts: result.data }));
                }
            });
        }
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
