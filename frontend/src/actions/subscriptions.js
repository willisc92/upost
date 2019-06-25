import API from "../utils/API";

// SET_SUBSCRIPTIONS
export const setSubscriptions = (subscriptions) => {
    return { type: "SET_SUBSCRIPTIONS", subscriptions };
};

// START_SET_SUBSCRIPTIONS
export const startGetSubscriptions = () => {
    return (dispatch) => {
        API.get(`subscriptions/${localStorage.getItem("user_id")}`).then((result) => {
            dispatch(setSubscriptions(result.data.subscriptions));
        });
    };
};
