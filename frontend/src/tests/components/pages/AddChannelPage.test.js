import { AddChannelPage } from "../../../components/pages/AddChannelPage";
import React from "react";
import { shallow } from "enzyme";
import channels from "../../fixtures/channels";

let addChannel, wrapper, history;

beforeEach(() => {
    addChannel = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });
    history = {
        push: jest.fn()
    };
    wrapper = shallow(<AddChannelPage addChannel={addChannel} history={history} />);
});

test("Should render page correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should redirect uppon successful submission", async () => {
    await wrapper.instance().onSubmit(channels[0]);
    expect(addChannel).toHaveBeenCalledWith({ ...channels[0] });
    expect(history.push).toHaveBeenCalledWith("/myChannels");
});
