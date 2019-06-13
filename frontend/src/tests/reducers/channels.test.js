import channelsReducer from "../../reducers/channels";
import channels from "../fixtures/channels";

const channelsDefaultState = { error: null, loading: false, channels: [] };

test("Should alter state from CHANNEL_START action object", () => {
    const action = {
        type: "CHANNEL_START"
    };

    const state = channelsReducer(undefined, action);
    expect(state).toEqual({
        ...channelsDefaultState,
        error: null,
        loading: true
    });
});

test("Should alter state from SET_CHANNELS action object", () => {
    const action = {
        type: "SET_CHANNELS",
        channels
    };

    const state = channelsReducer(undefined, action);
    expect(state).toEqual({
        ...channelsDefaultState,
        channels
    });
});

test("Should alter state from CHANNEL_FAIL action object", () => {
    const error = {};
    const action = {
        type: "CHANNEL_FAIL",
        error
    };

    const prevState = { error: null, loading: true, channels: [] };
    const state = channelsReducer(prevState, action);
    expect(state).toEqual({
        ...prevState,
        error,
        loading: false
    });
});

test("Should alter state from CHANNEL_SUCCESS action object", () => {
    const action = {
        type: "CHANNEL_SUCCESS"
    };

    const prevState = { error: null, loading: true, channels: [] };
    const state = channelsReducer(prevState, action);
    expect(state).toEqual({
        ...prevState,
        error: null,
        loading: false
    });
});
