import { shallow } from "enzyme";
import { MyChannelsPage } from "../../../components/pages/MyChannelsPage";
import React from "react";
import channels from "../../fixtures/channels";

let startSetChannels, wrapper, history;

beforeEach(() => {
    startSetChannels = jest.fn();
    history = {
        push: jest.fn()
    };
    localStorage.setItem("first_name", "WILLIS");
});

test("Should render page while loading", () => {
    wrapper = shallow(<MyChannelsPage loading={true} startSetChannels={startSetChannels} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should render page, no channels", () => {
    wrapper = shallow(<MyChannelsPage loading={false} startSetChannels={startSetChannels} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should render page, with channels", () => {
    wrapper = shallow(
        <MyChannelsPage
            loading={false}
            startSetChannels={startSetChannels}
            channels={channels}
            length={channels.length}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test("Should handle addChannel button", () => {
    wrapper = shallow(
        <MyChannelsPage
            loading={false}
            startSetChannels={startSetChannels}
            channels={channels}
            length={channels.length}
            history={history}
        />
    );
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith("/addChannel");
});
