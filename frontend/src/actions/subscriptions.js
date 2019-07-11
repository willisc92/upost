import API from "../utils/API";

/**
 * SET_SUBSCRIPTIONS
 * action generator.
 * adds the user's subscriptions to the store.
 *
 * @param {Number[]} subscriptions user subscriptions to store
 * @returns {Object} object to set subscriptions
 */
export const setSubscriptions = (subscriptions) => {
    return { type: "SET_SUBSCRIPTIONS", subscriptions };
};

/**
 * START_SET_SUBSCRIPTIONS.
 * gets user subscriptions from API and adds to store.
 *
 * @returns {promise}
 */
export const startGetSubscriptions = () => {
    return (dispatch) => {
        API.get(`user-subscriptions/${localStorage.getItem("user_id")}/`).then((result) => {
            dispatch(setSubscriptions(result.data.subscriptions));
        });
    };
};

/**
 * UPDATE_SUBSCRIPTION.
 * action generator.
 * updates (subscribe/unsubscribe) the user's subscription to a specific channel in the store.
 *
 * @param {Number} channel the channel to update subscription for
 * @returns {Object} object to update subscriptions
 */
export const updateSubscription = (channel) => {
    return { type: "UPDATE_SUBSCRIPTION", channel };
};

// START_UPDATE_SUBSCRIPTIONS
/**
 * START_UPDATE_SUBSCRIPTIONS.
 * sends update subscription request to API then update store.
 *
 * @param {Number} channel the channel to update subscription for
 */
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
