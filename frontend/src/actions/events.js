import API from "../utils/API";
import moment from "moment";

/**
 * EVENT_START
 * action generator
 * @returns {Object} to reset loading and error status
 */
export const eventStart = () => ({
    type: "EVENT_START"
});

/**
 * SET_EVENTS
 * action generator
 * @param {Array} events - array of events to set
 * @returns {Object} to update redux store with array of events
 */
export const setEvents = (events) => ({
    type: "SET_EVENTS",
    events
});

/**
 * CLEAR_EVENTS
 * action generator
 * @returns {Object} to clear events array in redux store
 */
export const clearEvents = () => ({
    type: "CLEAR_EVENTS"
});

/**
 * startSetEvent
 * action dispatcher
 * @param {number} id - id of event to get
 * @returns {Promise} to be handled
 */
export const startSetEvent = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            API.get(`events/${id}/`)
                .then((result) => {
                    dispatch(eventSuccess());
                    dispatch(setEvents(result.data));
                    resolve(result);
                })
                .catch((error) => {
                    dispatch(eventFail(error));
                    reject(error);
                });
        });
    };
};

/**
 * startGetEvent
 * action dispatcher
 * @param {number} id - id of post to get related events
 * @returns {Promise} to be handled
 */
export const startGetEvent = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            API.get("events/", {
                params: {
                    post: id
                }
            })
                .then((result) => {
                    dispatch(eventSuccess());
                    dispatch(setEvents(result.data));
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(eventFail(err));
                    reject(err);
                });
        });
    };
};

/**
 * addEvent
 * action dispatcher
 * @param {Object} event - event data
 * @returns {Promise} to be handled
 */
export const addEvent = (event) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            API.post(`events/`, event)
                .then((result) => {
                    dispatch(eventSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(eventFail(err));
                    reject(err);
                });
        });
    };
};

/**
 * editEvent
 * action dispatcher
 * @param {number} id - event id to edit
 * @param {Object} updates - event data
 * @returns {Promise} to be handled
 */
export const editEvent = (id, updates) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            API.put(`events/${id}/`, updates)
                .then((result) => {
                    dispatch(eventSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(eventFail(err));
                    reject(err);
                });
        });
    };
};

/**
 * EVENT_FAIL
 * action generator
 * @param {Object} error - error to store in redux store
 */
export const eventFail = (error) => ({
    type: "EVENT_FAIL",
    error
});

/**
 * EVENT_SUCCESS
 * action generator
 */
export const eventSuccess = () => ({
    type: "EVENT_SUCCESS"
});

/**
 * deleteEvent
 * action dispatcher
 * @param {number} id - id of event to soft delete
 * @returns {Promise} to be handled
 */
export const deleteEvent = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            const updates = {
                deleted_flag: true,
                deletion_date: moment().format("YYYY-MM-DD")
            };
            API.patch(`events/${id}/`, updates)
                .then((result) => {
                    dispatch(eventSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(eventFail(err));
                    reject(err);
                });
        });
    };
};

/**
 * restoreEvent
 * action dispatcher
 * @param {number} id - id of event to restore
 * @returns {Promise} to be handled
 */
export const restoreEvent = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            const updates = {
                deleted_flag: false,
                deletion_date: null
            };
            API.patch(`events/${id}/`, updates)
                .then((result) => {
                    dispatch(eventSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(eventFail(err));
                    reject(err);
                });
        });
    };
};

/**
 * getFreeFoodEvents
 * action dispatcher
 * @returns {Promise} to be handled
 */
export const getFreeFoodEvents = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            API.get(`free-food/`)
                .then((result) => {
                    dispatch(eventSuccess());
                    dispatch(setEvents(result.data));
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(eventFail(err));
                    reject(err);
                });
        });
    };
};
