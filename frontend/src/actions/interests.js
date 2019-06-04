import API from "../utils/API";

// SET_USER_INTERESTS
export const setUserInterests = (userInterests) => ({
    type: "SET_USER_INTERESTS",
    userInterests
});

// START_SET_USER_INTERESTS
export const startSetUserInterests = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.get(`user-interests/${localStorage.getItem("user_id")}`)
                .then((result) => {
                    dispatch(setUserInterests(result.data.interests));
                    resolve(true);
                })
                .catch((error) => {
                    console.log("error in getting user interests", error);
                    reject(error);
                });
        });
    };
};

// EDIT_USER_INTERESTS
export const editUserInterests = (userInterests) => ({
    type: "EDIT_USER_INTERESTS",
    userInterests
});

// START_EDIT_USER_INTERESTS
export const startEditUserInterests = (userInterests) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.put(`user-interests/${localStorage.getItem("user_id")}/`, {
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
        });
    };
};

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
