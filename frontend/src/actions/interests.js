import API from "../utils/API";

// SET_INTERESTS
export const setInterests = (userInterests) => ({
    type: "SET_USER_INTERESTS",
    userInterests
});

// START_SET_INTERESTS
export const startSetUserInterests = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.get(`user-interests/${localStorage.getItem("user_id")}`)
                .then((result) => {
                    dispatch(setInterests(result.data.interests));
                    resolve(true);
                })
                .catch((error) => {
                    console.log("error in getting user interests", error), reject(true);
                });
        });
    };
};
