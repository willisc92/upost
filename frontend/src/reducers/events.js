// Event Reducers
export const eventsDefaultState = { error: null, loading: false, events: [] };

export default (state = eventsDefaultState, action) => {
    switch (action.type) {
        case "EVENT_START":
            return {
                ...state,
                error: null,
                loading: true
            };
        case "CLEAR_EVENTS":
            return {
                ...state,
                events: []
            };
        case "SET_EVENTS":
            return {
                ...state,
                events: action.events
            };
        case "EVENT_FAIL":
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case "EVENT_SUCCESS":
            return {
                ...state,
                error: null,
                loading: false
            };
        case "DECREMENT_CAPACITY_STATUS":
            return {
                ...state,
                events: action.event
            };
        case "INCREMENT_CAPACITY_STATUS":
            return {
                ...state,
                events: action.event
            };
        default:
            return state;
    }
};
