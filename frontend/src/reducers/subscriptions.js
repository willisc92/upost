// subscriptions Reducers
const subscriptionsDefaultState = [];

export default (state = subscriptionsDefaultState, action) => {
    switch (action.type) {
        case "SET_SUBSCRIPTIONS":
            return {
                subscriptions: action.subscriptions
            };
        case "UPDATE_SUBSCRIPTION":
            let subscriptions = [];
            if (state.subscriptions.includes(action.channel)) {
                subscriptions = state.subscriptions.filter((channel) => {
                    return channel !== action.channel;
                });
            } else {
                subscriptions = [...state.subscriptions, action.channel];
            }
            return {
                subscriptions
            };
        default:
            return state;
    }
};
