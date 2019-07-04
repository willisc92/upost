// attendance reducers
const attendanceDefaultState = [];

export default (state = attendanceDefaultState, action) => {
    switch (action.type) {
        case "SET_ATTENDANCE":
            return {
                ...state,
                attendance: action.attendance
            };
        case "DELETE_ATTENDANCE":
            return {
                ...state,
                attendance: state.attendance.filter((event_id) => {
                    return event_id !== action.event_id;
                })
            };
        case "ADD_ATTENDANCE":
            return {
                ...state,
                attendance: [...state.attendance, action.event_id]
            };
        default:
            return state;
    }
};
