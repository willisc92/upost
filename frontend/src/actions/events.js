import API from "../utils/API";

export const eventStart = () => ({
    type: "EVENT_START"
});

// SET_EVENTS
export const setEvents = (events) => ({
    type: "SET_EVENTS",
    events
});

// START_SET_EVENTS
export const startSetMyEvents = () => {
    return (dispatch) => {
        dispatch(eventStart());
        API.get("posts/", {
            params: {
                user: localStorage.getItem("user_id")
            }
        })
            .then((result) => {
                dispatch(eventSuccess());
                const eventsList = [];
                result.data.forEach((post) => {
                    if (!!post.post_event) {
                        eventsList.push(post.post_event);
                    }
                });
                dispatch(setEvents(eventsList));
            })
            .catch((err) => {
                dispatch(eventFail(err));
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
            API.post(`events/`, {
                ...event,
                user: localStorage.getItem("user_id")
            })
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
            API.put(`events/${id}/`, {
                ...updates,
                user: localStorage.getItem("user_id")
            })
                .then((result) => {
                    dispatch(eventSuccess());
                    dispatch(startSetMyEvents());
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
