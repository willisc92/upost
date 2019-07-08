// Channels Reducers
const channelsDefaultState = { error: null, loading: false, channels: [] };

export default (state = channelsDefaultState, action) => {
    switch (action.type) {
        case "CHANNEL_START":
            return {
                ...state,
                error: null,
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
                error: null,
                loading: false
            };
        case "CHANNEL_CLEAR":
            return {
                ...state,
                channels: []
            };
        default:
            return state;
    }
};
