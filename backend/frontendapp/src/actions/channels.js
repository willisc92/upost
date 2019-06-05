import API from "../utils/API";

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
        API.get("channels/", {
            params: {
                user: localStorage.getItem("user_id")
            }
        })
            .then((result) => {
                dispatch(channelSuccess());
                dispatch(setChannels(result.data));
            })
            .catch((err) => {
                dispatch(channelFail(err));
            });
    };
};

export const startGetChannel = (id) => {
    return (dispatch) => {
        dispatch(channelStart());
        API.get("channels/", {
            params: {
                channel_id: id
            }
        })
            .then((result) => {
                dispatch(channelSuccess());
                dispatch(setChannels(result.data));
            })
            .catch((err) => {
                dispatch(channelFail(err));
            });
    };
};

export const addChannel = (channel) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            API.post(`channels/`, {
                ...channel,
                user: localStorage.getItem("user_id")
            })
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
            API.put(`channels/${id}/`, {
                ...updates,
                user: localStorage.getItem("user_id")
            })
                .then(() => {
                    dispatch(channelSuccess());
                    dispatch(startSetChannels());
                    resolve(true);
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
