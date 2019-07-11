import API from "../utils/API";
import { getCurrentUser } from "./auth";

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
 * EDIT_USER_INTERESTS.
 * action generator.
 * updates the store with the changed user interests.
 *
 * @param {string[]} userInterests edited interests
 * @returns {Object} object to update interests
 */
export const editUserInterests = (userInterests) => ({
    type: "EDIT_USER_INTERESTS",
    userInterests
});

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
                            dispatch(editUserInterests(userInterests));
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
                    dispatch(setUserInterests(result.data));
                    resolve(true);
                })
                .catch((error) => {
                    console.log("error in getting Interests", error);
                    reject(error);
                });
        });
    };
};

/**
 * CLEAR_INTERESTS.
 * Dispatches clear interest action.
 *
 * @returns {Object} to clear interests.
 */
export const clearInterests = () => ({
    type: "CLEAR_INTERESTS"
});
