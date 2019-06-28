import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import channelFiltersReducer from "../reducers/channel_filters";
import channelsReducer from "../reducers/channels";
import postFiltersReducer from "../reducers/post_filters";
import eventFilterReducer from "../reducers/event_filters";
import postReducer from "../reducers/posts";
import eventReducer from "../reducers/events";
import interestsReducer from "../reducers/interests";
import communityReducer from "../reducers/communities";
import incentiveTypeReducer from "../reducers/incentive_types";
import dietOptionsReducer from "../reducers/diet_options";
import incentivePackageReducer from "../reducers/incentivePackage";
import subscriptionsReducer from "../reducers/subscriptions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            auth: authReducer,
            channelFilters: channelFiltersReducer,
            postFilters: postFiltersReducer,
            eventFilters: eventFilterReducer,
            channels: channelsReducer,
            userInterests: interestsReducer,
            posts: postReducer,
            communities: communityReducer,
            events: eventReducer,
            incentiveTypes: incentiveTypeReducer,
            dietOptions: dietOptionsReducer,
            incentivePackage: incentivePackageReducer,
            subscriptions: subscriptionsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
