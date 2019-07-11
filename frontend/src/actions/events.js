import API from "../utils/API";

export const eventStart = () => ({
    type: "EVENT_START"
});

// SET_EVENTS
export const setEvents = (events) => ({
    type: "SET_EVENTS",
    events
});

export const clearEvents = () => ({
    type: "CLEAR_EVENTS"
});

export const startSetEvent = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            API.get(`events/${id}`)
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

export const eventFail = (error) => ({
    type: "EVENT_FAIL",
    error
});

export const eventSuccess = () => ({
    type: "EVENT_SUCCESS"
});

export const deleteEvent = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(eventStart());
            API.delete(`events/${id}/`)
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
