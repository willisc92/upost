import API from "../utils/API";
import { getCurrentUser } from "./auth";
import moment from "moment";

/**
 * CHANNEL_START.
 * action generator.
 * Indicates some other actions will be dispatched
 *
 * @returns {Object} object to channel reducer
 */
export const channelStart = () => ({
    type: "CHANNEL_START"
});

/**
 * SET_CHANNELS.
 * action generator.
 * @param {Object} channels channels to set to store
 * @returns {Object} object to channel reducer
 */
export const setChannels = (channels) => ({
    type: "SET_CHANNELS",
    channels
});

/**
 * startSetChannels
 * action dispatcher - gets user's channels.
 */
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

/**
 * startGetChannel
 * action dispatcher - gets channel by ID
 * @param {number} id of channel to get
 * @returns {Promise} to be handled
 */
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

/**
 * addChannel
 * action dispatcher - adds a channel
 * @param {Object} channel - Data to add
 * @returns {Promise} to be handled
 */
export const addChannel = (channel) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            API.post(`channels/`, channel)
                .then((result) => {
                    dispatch(channelSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(channelFail(err));
                    reject(err);
                });
        });
    };
};

/**
 * edit Channel
 * action dispatcher - adds a channel
 * @param {number} id - id of channel to edit
 * @param {Object} updates - Data to update
 * @returns {Promise} to be handled
 */
export const editChannel = (id, updates) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            API.put(`channels/${id}/`, updates)
                .then((result) => {
                    dispatch(channelSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(channelFail(err));
                    reject(err);
                });
        });
    };
};

/**
 * CHANNEL_FAIL.
 * action generator.
 * @param {Object} error - Error to log
 * @returns {Object} object to channel reducer
 */
export const channelFail = (error) => ({
    type: "CHANNEL_FAIL",
    error
});

/**
 * CHANNEL_SUCCESS.
 * action generator.
 * @returns {Object} object to channel reducer
 */
export const channelSuccess = () => ({
    type: "CHANNEL_SUCCESS"
});

/**
 * CLEAR_CHANNELS.
 * action generator.
 * @returns {Object} object to channel reducer
 */
export const clearChannels = () => ({
    type: "CLEAR_CHANNELS"
});

/**
 * searchChannels
 * action dispatcher - searches for channels
 * @param {string} text - text to search channels by
 * @returns {Promise} to be handled
 */
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

/**
 * deleteChannel
 * action dispatcher - soft deletes a channel
 * @param {number} id - id of channel to delete
 * @returns {Promise} to be handled
 */
export const deleteChannel = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            const updates = {
                deleted_flag: true,
                deletion_date: moment().format("YYYY-MM-DD")
            };
            API.patch(`channels/${id}/`, updates)
                .then((result) => {
                    dispatch(channelSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(channelFail(err));
                    reject(err);
                });
        });
    };
};

/**
 * restoreChannel
 * action dispatcher - restores a channel
 * @param {number} id - id of channel to restore
 * @returns {Promise} to be handled
 */
export const restoreChannel = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(channelStart());
            const updates = {
                deleted_flag: false,
                deletion_date: null
            };
            API.patch(`channels/${id}/`, updates)
                .then((result) => {
                    dispatch(channelSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(channelFail(err));
                    reject(err);
                });
        });
    };
};
