import API from "../utils/API";
import { getCurrentUser } from "./auth";

export const channelStart = () => ({
    type: "CHANNEL_START"
});

// SET_CHANNELS
export const setChannels = (channels) => ({
    type: "SET_CHANNELS",
    channels
});

// START_SET_CHANNELS
export const startSetChannels = () => {
    return (dispatch) => {
        dispatch(channelStart());
        getCurrentUser()
            .then((res) => {
                API.get("channels/", {
                    params: {
                        user: res.data.id
                    }
                })
                    .then((result) => {
                        dispatch(channelSuccess());
                        dispatch(setChannels(result.data));
                    })
                    .catch((err) => {
                        dispatch(channelFail(err));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            });
    };
};

export const startGetChannel = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            API.get("channels/", {
                params: {
                    channel_id: id
                }
            })
                .then((result) => {
                    dispatch(channelSuccess());
                    dispatch(setChannels(result.data));
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(channelFail(err));
                    reject(err);
                });
        });
    };
};

export const addChannel = (channel) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            API.post(`channels/`, channel)
                .then((result) => {
                    dispatch(channelSuccess());
                    dispatch(startSetChannels());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(channelFail(err));
                    reject(err);
                });
        });
    };
};

export const editChannel = (id, updates) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            API.put(`channels/${id}/`, updates)
                .then((result) => {
                    dispatch(channelSuccess());
                    dispatch(startSetChannels());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(channelFail(err));
                    reject(err);
                });
        });
    };
};

export const channelFail = (error) => ({
    type: "CHANNEL_FAIL",
    error
});

export const channelSuccess = () => ({
    type: "CHANNEL_SUCCESS"
});

export const clearChannels = () => ({
    type: "CLEAR_CHANNELS"
});

// Search Channels

export const searchChannels = (text) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            API.get(`channels/?search=${text}`)
                .then((result) => {
                    dispatch(channelSuccess());
                    dispatch(setChannels(result.data));
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(channelFail(err));
                    reject(err);
                });
        });
    };
};
