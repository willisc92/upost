import {
    channelStart,
    setChannels,
    startSetChannels,
    startGetChannel,
    addChannel,
    editChannel,
    channelFail,
    channelSuccess
} from "../../actions/channels";
import channels from "../fixtures/channels";
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const createMockStore = configureMockStore([thunk]);

test("Should return channelStart action object", () => {
    const action = channelStart();
    expect(action).toEqual({
        type: "CHANNEL_START"
    });
});

test("Should return setChannels action object", () => {
    const action = setChannels(channels);
    expect(action).toEqual({
        type: "SET_CHANNELS",
        channels
    });
});

test("Should return channelFail action object", () => {
    const error = "some error";
    const action = channelFail(error);
    expect(action).toEqual({
        type: "CHANNEL_FAIL",
        error
    });
});

test("Should return channelSuccess action object", () => {
    const action = channelSuccess();
    expect(action).toEqual({
        type: "CHANNEL_SUCCESS"
    });
});

test("Should successfully call startSetChannels and perform API call", async () => {
    localStorage.clear();
    localStorage.setItem("user_id", "123");

    const store = createMockStore({
        channels: {
            token: null,
            error: "",
            channels: []
        }
    });

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: channels
        })
    );

    const expectedActions = [
        { type: "CHANNEL_START" },
        { type: "CHANNEL_SUCCESS" },
        {
            type: "SET_CHANNELS",
            channels
        }
    ];

    await store.dispatch(startSetChannels());
    expect(store.getActions()).toEqual(expectedActions);
});

test("Should test successful startGetChannel dispatch calls", () => {
    const store = createMockStore({
        channels: {
            token: null,
            error: "",
            channels: []
        }
    });

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: [channels[0]]
        })
    );

    const expectedActions = [
        { type: "CHANNEL_START" },
        { type: "CHANNEL_SUCCESS" },
        {
            type: "SET_CHANNELS",
            channels: [channels[0]]
        }
    ];

    store.dispatch(startGetChannel(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test("Should test successful addChannel dispatch calls", () => {
    localStorage.clear();
    localStorage.setItem("user_id", 123);

    const store = createMockStore({
        channels: {
            token: null,
            error: "",
            channels: []
        }
    });

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({}));
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: [channels[0]]
        })
    );

    const expectedActions = [
        { type: "CHANNEL_START" },
        { type: "CHANNEL_SUCCESS" },
        { type: "CHANNEL_START" },
        { type: "CHANNEL_SUCCESS" },
        { type: "SET_CHANNELS", channels: [channels[0]] }
    ];

    store.dispatch(addChannel(channels[0])).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test("Should test successful edit dispatch calls", () => {
    localStorage.clear();
    localStorage.setItem("user_id", 123);

    const store = createMockStore({
        channels: {
            token: null,
            error: "",
            channels: [channels[0]]
        }
    });

    mockAxios.put.mockImplementationOnce(() => Promise.resolve({}));
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: [channels[1]]
        })
    );

    const expectedActions = [
        { type: "CHANNEL_START" },
        { type: "CHANNEL_SUCCESS" },
        { type: "CHANNEL_START" },
        { type: "CHANNEL_SUCCESS" },
        { type: "SET_CHANNELS", channels: [channels[1]] }
    ];

    store.dispatch(editChannel(1, channels[0])).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});
