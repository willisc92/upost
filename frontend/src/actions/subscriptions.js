import API from "../utils/API";

// SET_SUBSCRIPTIONS
export const setSubscriptions = (subscriptions) => {
    return { type: "SET_SUBSCRIPTIONS", subscriptions };
};

// START_SET_SUBSCRIPTIONS
export const startGetSubscriptions = () => {
    return (dispatch) => {
        API.get(`user-subscriptions/${localStorage.getItem("user_id")}`).then((result) => {
            dispatch(setSubscriptions(result.data.subscriptions));
        });
    };
};

// UPDATE_SUBSCRIPTION
export const updateSubscription = (channel) => {
    return { type: "UPDATE_SUBSCRIPTION", channel };
};

// START_UPDATE_SUBSCRIPTIONS
export const startUpdateSubscriptions = (channel) => {
    return (dispatch) => {
        API.post("subscriptions/", { channel, community_member: localStorage.getItem("user_id") })
            .then(() => {
                dispatch(updateSubscription(channel));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
