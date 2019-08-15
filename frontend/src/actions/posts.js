import API, { setContentToForm, resetContentType } from "../utils/API";
import { getCurrentUser } from "./auth";
import moment from "moment";

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
        getCurrentUser()
            .then((res) => {
                API.get("posts/", {
                    params: {
                        user: res.data.id
                    }
                })
                    .then((result) => {
                        dispatch(postSuccess());
                        dispatch(setPosts(result.data));
                    })
                    .catch((err) => {
                        dispatch(postFail(err));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
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
 * @param {Object[]} interests an array of interest objects or interest tags
 * @returns {Function} dispatch function
 */
export const startSetInterestRandomPosts = (interests) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
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
            resolve(true);
        });
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
 * GET_POST.
 * from API gets a specific post, but does not add to store.  Does not dispatch any actions.
 *
 * @param {number} id post id to get
 */
export const getPost = (id) => {
    return new Promise((resolve, reject) => {
        API.get("posts/", {
            params: {
                post_id: id
            }
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
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
            if (post.toString() == "[object FormData]") {
                setContentToForm();
            }
            dispatch(postStart());
            API.post(`posts/`, post)
                .then((result) => {
                    if (post.toString() == "[object FormData]") {
                        resetContentType();
                    }
                    dispatch(postSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    resetContentType();
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
            if (updates.toString() == "[object FormData]") {
                setContentToForm();
            }
            dispatch(postStart());
            API.patch(`posts/${id}/`, updates)
                .then((result) => {
                    if (updates.toString() == "[object FormData]") {
                        resetContentType();
                    }
                    dispatch(postSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    resetContentType();
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

/**
 * CLEAR_POSTS.
 * action generator.
 * clears posts in store
 *
 * @returns {Object} object to reset posts
 */
export const clearPosts = () => ({
    type: "CLEAR_POSTS"
});

/**
 * searchPosts
 * action dispatcher - searches for posts
 * @param {string} text - text to search posts by
 * @returns {Promise} to be handled
 */
export const searchPosts = (text) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.get(`posts/?search=${text}`)
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
 * deletePost
 * action dispatcher - soft deletes a post
 * @param {number} id - id of post to delete
 * @param {Object} post - Post object to delete
 * @returns {Promise} to be handled
 */
export const deletePost = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            const updates = {
                deleted_flag: true,
                deletion_date: moment().toDate()
            };
            API.patch(`posts/${id}/`, updates)
                .then((result) => {
                    dispatch(postSuccess());
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
 * restorePost
 * action dispatcher - restores a post
 * @param {number} id - id of post to restore
 * @param {Object} post - Post object to restore
 * @returns {Promise} to be handled
 */
export const restorePost = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            const updates = {
                deleted_flag: false,
                deletion_date: null
            };
            API.patch(`posts/${id}/`, updates)
                .then((result) => {
                    dispatch(postSuccess());
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
 * getNonInterestPosts
 * action dispatcher - gets posts that are NOT relavent to your interests
 * @returns {Promise} to be handled
 */
export const getNonInterestPosts = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.get(`non-interest-posts/`)
                .then((result) => {
                    dispatch(postSuccess());
                    dispatch(setNonInterestPosts(result.data));
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
 * setNonInterestPosts
 * action generator - sets posts not relavent to interests
 * @returns {Object} Action object
 */
export const setNonInterestPosts = (nonInterestPosts) => ({
    type: "SET_NON_INTEREST_POSTS",
    nonInterestPosts
});

/**
 * getRandomNonInterestPost
 * action dispatcher - Gets a random post that is not relavent to interests
 * @returns {Promise} Promise to handle
 */
export const getRandomNonInterestPost = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.get(`random-post/`)
                .then((result) => {
                    dispatch(postSuccess());
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
 * getCommunityPosts
 * action dispatcher - Gets posts only according to interests
 * @returns {Promise} Promise to handle
 */
export const getCommunityPosts = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(postStart());
            API.get(`community-posts/`)
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
