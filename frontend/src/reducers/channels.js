// Channels Reducers
const channelsDefaultState = [];

export default (state = channelsDefaultState, action) => {
    switch (action.type) {
        case "SET_CHANNELS":
            return {
                channels: action.channels
            };
        default:
            return state;
    }
};
