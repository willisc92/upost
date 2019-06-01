// Channels Reducers
const channelsDefaultState = { error: "", loading: false, channels: [] };

export default (state = channelsDefaultState, action) => {
    switch (action.type) {
        case "CHANNEL_START":
            return {
                ...state,
                error: "",
                loading: true
            };
        case "SET_CHANNELS":
            return {
                ...state,
                channels: action.channels
            };
        case "CHANNEL_FAIL":
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case "CHANNEL_SUCCESS":
            return {
                ...state,
                error: "",
                loading: false
            };
        default:
            return state;
    }
};
