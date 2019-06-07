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

test("Should return channelSuccess acction object", () => {
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
