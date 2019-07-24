import API from "../utils/API";
import { getCurrentUser } from "./auth";

/**
 * SET_INTERESTS.
 * action generator.
 * adds the interest options to the store.
 *
 * @param {string[]} interests interest to store
 * @returns {Object} object to set interests
 */
export const setInterests = (interests) => ({
    type: "SET_INTERESTS",
    interests
});

/**
 * SET_USER_INTERESTS.
 * action generator.
 * adds the user's interests to the store.
 *
 * @param {string[]} userInterests interests to store
 * @returns {Object} object to set interests
 */
export const setUserInterests = (userInterests) => ({
    type: "SET_USER_INTERESTS",
    userInterests
});

/**
 * START_SET_USER_INTERESTS.
 * gets user interests from API and adds to store.
 *
 * @returns {Promise}
 */
export const startSetUserInterests = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            getCurrentUser()
                .then((res) => {
                    API.get(`user-interests/${res.data.id}/`)
                        .then((result) => {
                            dispatch(setUserInterests(result.data.interests));
                            resolve(result);
                        })
                        .catch((error) => {
                            console.log("error in getting user interests", error);
                            reject(error);
                        });
                })
                .catch((err) => {
                    console.log(JSON.stringify(err));
                });
        });
    };
};

/**
 * START_EDIT_USER_INTERESTS.
 * sends put request to API with updated user interests.
 * upon sucessful put saves edited interests to store.
 *
 * @param {string[]} userInterests edited interests
 * @returns {Promise}
 */
export const startEditUserInterests = (userInterests) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            getCurrentUser()
                .then((res) => {
                    API.put(`user-interests/${res.data.id}/`, {
                        interests: userInterests
                    })
                        .then((result) => {
                            dispatch(setUserInterests(userInterests));
                            resolve(true);
                        })
                        .catch((error) => {
                            console.log("error in updating user interests", error);
                            reject(error);
                        });
                })
                .catch((err) => {
                    console.log(JSON.stringify(err, null, 2));
                });
        });
    };
};

/**
 * GET_ALL_INTERESTS.
 * gets all interests from API and adds to store.
 *
 * @returns {Promise}
 */
export const getAllInterests = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.get(`interests/`)
                .then((result) => {
                    dispatch(setInterests(result.data));
                    resolve(true);
                })
                .catch((error) => {
                    console.log("error in getting Interests", error);
                    reject(error);
                });
        });
    };
};
