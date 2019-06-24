import API from "../utils/API";
import { getCurrentUser } from "./auth";

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
            getCurrentUser()
                .then((res) => {
                    API.get("accounts/", {
                        params: {
                            username: res.data.username
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
                })
                .catch((err) => {
                    console.log(JSON.stringify(err));
                });
        });
    };
};
