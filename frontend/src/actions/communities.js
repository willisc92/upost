import API from "../utils/API";
import { getCurrentUser } from "./auth";

/**
 * SET_COMMUNITIES.
 * action generator.
 * adds the user's interests to the store.
 *
 */

export const setCommunities = (communities) => ({
  type: "SET_COMMUNITIES",
  communities
});

/**
 * Gets user communities from API and adds to store.
 * @returns {promise}
 */
export const getMyCommunities = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getCurrentUser()
        .then((res) => {
          API.get(`user-communities/${res.data.id}/`)
            .then((result) => {
              dispatch(communitySuccess());
              dispatch(setCommunities(result.data));
              resolve(result);
            })
            .catch((error) => {
              dispatch(communityFail(error));
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
 * EDIT_USER_COMMUNITIES.
 * action generator.
 * updates the store with the changed user communities.
 *
 * @param {string[]} communities edited communities
 * @returns {Object} object to update communities
 */
export const editUserCommunities = (communities) => ({
  type: "EDIT_USER_COMMUNITIES",
  communities
});

/**
 * START_EDIT_USER_COMMUNITIES.
 * sends put request to API with updated user communities.
 * upon sucessful put saves edited communities to store.
 *
 * @param {string[]} communities edited communities
 * @returns {Promise}
 */
export const startEditUserCommunities = (communities) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getCurrentUser()
        .then((res) => {
          API.put(`user-communities/${res.data.id}/`, {
            community: communities
          })
            .then((result) => {
              dispatch(editUserCommunities(communities));
              resolve(true);
            })
            .catch((error) => {
              console.log("error in updating user communities", error);
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
 * GET_All_COMMUNITIES
 * gets all communities from API and adds to store
 *
 * @returns {Promise}
 */
export const getAllCommunities = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.get("communities/")
        .then((result) => {
          dispatch(communitySuccess());
          dispatch(setCommunities(result.data));
          resolve(result);
        })
        .catch((error) => {
          dispatch(communityFail(error));
          reject(error);
        });
    });
  };
};

export const communityFail = (error) => ({
  type: "COMMUNITY_FAIL",
  error
});

export const communitySuccess = () => ({
  type: "COMMUNITY_SUCCESS"
});
