import API from "../utils/API";

// SET_CHANNELS
export const setChannels = (channels) => ({
    type: "SET_CHANNELS",
    channels
});

// START_SET_CHANNELS
export const startSetChannels = () => {
    return (dispatch) => {
        API.get("channels/", {
            params: {
                user: localStorage.getItem("user_id")
            }
        }).then((result) => {
            dispatch(setChannels(result.data));
        });
    };
};

export const addChannel = (channel) => {
    return (dispatch) => {
        API.post("channels/", {
            ...channel,
            user: localStorage.getItem("user_id")
        })
            .then((result) => {
                dispatch(startSetChannels());
            })
            .catch((err) => {
                alert(err);
            });
    };
};
