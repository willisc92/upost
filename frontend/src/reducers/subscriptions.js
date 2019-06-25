// subscriptions Reducers
const subscriptionsDefaultState = [];

export default (state = subscriptionsDefaultState, action) => {
    switch (action.type) {
        case "SET_SUBSCRIPTIONS":
            return {
                subscriptions: action.subscriptions
            };
        default:
            return state;
    }
};
