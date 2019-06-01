import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import channelFiltersReducer from "../reducers/channel_filters";
import channelsReducer from "../reducers/channels";
import interestsReducer from "../reducers/interests";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            auth: authReducer,
            channelFilters: channelFiltersReducer,
            channels: channelsReducer,
            userInterests: interestsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
