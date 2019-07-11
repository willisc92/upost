import API from "../utils/API";

/**
 * SET_ATTENDANCE.
 * action generator.
 * adds the user's attending events to the store.
 *
 * @param {Number[]} attendance event ids to store
 * @return {Object} object to set attendance
 */
export const setAttendance = (attendance) => {
    return { type: "SET_ATTENDANCE", attendance };
};

/**
 * START_SET_ATTENDANCE.
 * gets user's attending events from API and adds to store.
 */
export const startGetAttendance = () => {
    return (dispatch) => {
        API.get(`user-attendance/${localStorage.getItem("user_id")}/`)
            .then((result) => {
                dispatch(setAttendance(result.data.attends));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

/**
 * DELETE_ATTENDANCE.
 * removes an event from the attendance store.
 *
 * @param {Number} event_id event id to remove
 * @return {Object} object to remove attendance
 */
export const deleteAttendance = (event_id) => {
    return { type: "DELETE_ATTENDANCE", event_id };
};

/**
 * START_DELETE_ATTENDANCE.
 * sends request to API to remove an event from the user's attendance then removes from store.
 *
 * @param {Number} event_id event id to remove
 */
export const startDeleteAttendance = (event_id) => {
    return (dispatch) => {
        API.delete("attendance/", { data: { event_id, attendee: localStorage.getItem("user_id") } })
            .then(() => {
                dispatch(deleteAttendance(event_id));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

/**
 * ADD_ATTENDANCE.
 * action generator.
 * adds an event to the attendance store.
 *
 * @param {Number} event_id event id to add
 * @return {Object} object to add attendance
 */
export const addAttendance = (event_id) => {
    return { type: "ADD_ATTENDANCE", event_id };
};

/**
 * START_ADD_ATTENDANCE.
 * sends request to API to add an event to user's attendance then adds to store.
 *
 * @param {Number} event_id event id to add
 */
export const startAddAttendance = (event_id) => {
    return (dispatch) => {
        API.post("attendance/", { event: event_id, attendee: localStorage.getItem("user_id") })
            .then(() => {
                dispatch(addAttendance(event_id));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
