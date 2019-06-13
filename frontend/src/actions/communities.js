import API from "../utils/API";

export const communityStart = () => ({
    type: "COMMUNITY_START"
});

export const communityFail = (error) => ({
    type: "COMMUNITY_FAIL",
    error
});

export const communitySuccess = () => ({
    type: "COMMUNITY_SUCCESS"
});

export const setCommunities = (communities) => ({
    type: "SET_COMMUNITIES",
    communities
});

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

export const getMyCommunities = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.get("accounts/", {
                params: {
                    username: localStorage.getItem("user_name")
                }
            })
                .then((result) => {
                    dispatch(communitySuccess());
                    dispatch(setCommunities(result.data.community));
                    resolve(result);
                })
                .catch((error) => {
                    dispiatch(communityFail(error));
                    reject(error);
                });
        });
    };
};
