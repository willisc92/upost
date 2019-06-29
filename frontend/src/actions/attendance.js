import API from "../utils/API";

// SET_ATTENDANCE
export const setAttendance = (attendance) => {
    return { type: "SET_ATTENDANCE", attendance };
};

// START_SET_ATTENDANCE
export const startGetAttendance = () => {
    return (dispatch) => {
        API.get(`user-attendance/${localStorage.getItem("user_id")}`)
            .then((result) => {
                dispatch(setAttendance(result.data.attends));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

// DELETE_ATTENDANCE
export const deleteAttendance = (event_id) => {
    return { type: "DELETE_ATTENDANCE", event_id };
};

// START_DELETE_ATTENDANCE
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

// ADD_ATTENDANCE
export const addAttendance = (event_id) => {
    return { type: "ADD_ATTENDANCE", event_id };
};

// START_ADD_ATTENDANCE
export const startAddAttendance = (event_id) => {
    return (dispatch) => {
        API.post("attendance/", { post: event_id, attendee: localStorage.getItem("user_id") })
            .then(() => {
                dispatch(addAttendance(event_id));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
