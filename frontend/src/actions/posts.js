import API from "../utils/API";

/**
 * POST_START.
 * action generator.
 * Resets the error and sets loading status.
 *
 * @returns {Object} object to reset error and loading status
 */
export const postStart = () => ({
    type: "POST_START"
});

/**
 * SET_POSTS.
 * action generator.
 * adds user's posts to store.
 *
 * @param {Object[]} posts posts to add to store
 * @returns {Object} object to add posts to store
 */
export const setPosts = (posts) => ({
    type: "SET_POSTS",
    posts
});

/**
 * START_SET_POSTS.
 * from API gets the current user's posts and adds to store.
 *
 * @returns dispatch function
 */
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

/**
 * SET_INTEREST_RANDOM_POSTS.
 * action generator.
 * resets the interestRandomPosts in store to be an empty array.
 *
 * @returns {Object} object to reset interestRandomPosts
 */
export const setInterestRandomPosts = () => {
    console.log("resetted");
    return { type: "SET_INTEREST_RANDOM_POSTS" };
};

/**
 * ADD_INTEREST_RANDOM_POSTS.
 * action generator.
 * adds a new interest and associated random posts to store.
 *
 * @param {Object} interestPosts contains tag and an array of posts
 * @returns {Object} object to add interest and posts to interestRandomPosts
 */
export const addInterestRandomPosts = (interestPosts) => {
    return { type: "ADD_INTEREST_RANDOM_POSTS", interestPosts };
};

/**
 * START_SET_INTEREST_RANDOM_POSTS.
 * resets the interestRandomPosts store.
 * for each interest provided gets random posts from API and adds to store.
 *
 * @param {Object[]} interests an array of interest objects
 * @returns {Function} dispatch function
 */
export const startSetInterestRandomPosts = (interests) => {
    return (dispatch) => {
        dispatch(postStart());
        dispatch(setInterestRandomPosts());
        // if we have a list of interest objects
        if (interests.length > 0 && !!interests[0].interest_tag) {
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
        }
        // if we have a list of interest tags
        else {
            for (let i = 0; i < interests.length; i++) {
                API.get("random-posts/", {
                    params: {
                        interest: interests[i]
                    }
                }).then((result) => {
                    if (result.data.length > 0) {
                        dispatch(addInterestRandomPosts({ tag: interests[i], posts: result.data }));
                    }
                });
            }
        }
        dispatch(postSuccess());
    };
};

/**
 * START_GET_POST.
 * from API gets a specifc post and adds to store.
 *
 * @param {number} id post id to get
 * @returns {Promise}
 */
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

/**
 * ADD_POST.
 * sends post request to API to add a new user created post.
 * upon sucessful post reloads user posts.
 *
 * @param {Object} post post object to add to API
 * @returns {Promise}
 */
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

/**
 * EDIT_POST.
 * sends put request to API to edit a user's post.
 * upon sucessful post reloads user posts.
 *
 * @param {number} id post id to edit
 * @param {Object} updates updates to be made to the post
 */
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

/**
 * POST_FAIL.
 * action generator.
 * adds error to the store.
 *
 * @param {Object} error the error
 * @returns {Object} object to set error
 */
export const postFail = (error) => ({
    type: "POST_FAIL",
    error
});

/**
 * POST_SUCCESS.
 * action generator.
 * resets loading and error status.
 *
 * @returns {Object} object to reset loading and error status
 */
export const postSuccess = () => ({
    type: "POST_SUCCESS"
});
