import { EditChannelPage } from "../../../components/pages/EditChannelPage";
import React from "react";
import { shallow } from "enzyme";
import channels from "../../fixtures/channels";

let match, channel, editChannel, wrapper, history, startGetChannel;

beforeEach(() => {
    channel = channels[0];
    localStorage.setItem("user_name", channel.user);

    match = {
        params: {
            id: channel.channel_id
        }
    };

    editChannel = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    startGetChannel = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    history = {
        push: jest.fn()
    };

    wrapper = shallow(
        <EditChannelPage editChannel={editChannel} history={history} startGetChannel={startGetChannel} match={match} />
    );
});

test("Should render page correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should call onSubmit and redirect when successfull", async () => {
    await wrapper.instance().onSubmit(channel);
    expect(editChannel).toHaveBeenCalledWith(match.params.id, channel);
    expect(history.push).toHaveBeenCalledWith("/myChannels");
});
