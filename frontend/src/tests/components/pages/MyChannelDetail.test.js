import { shallow } from "enzyme";
import { MyChannelDetail } from "../../../components/pages/MyChannelDetail";
import React from "react";
import channels from "../../fixtures/channels";
import posts from "../../fixtures/posts";

let startGetChannel, wrapper, history, match, channel;

beforeEach(() => {
    startGetChannel = jest.fn().mockImplementationOnce(() => {
        return Promise.resolve();
    });
    localStorage.setItem("user_name", channels[0].user);
    history = {
        push: jest.fn()
    };
    channel = channels[0];
    match = {
        params: {
            id: channel.channel_id
        }
    };
    wrapper = shallow(
        <MyChannelDetail
            startGetChannel={startGetChannel}
            match={match}
            loading={false}
            channel={channel}
            posts={posts}
            history={history}
        />
    );
});

test("Should render page correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should handleAddPost", () => {
    wrapper
        .find("button")
        .at(0)
        .simulate("click");
    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith(`/myChannels/${match.params.id}/addPost`);
});

test("Should handleEditChannel", () => {
    wrapper
        .find("button")
        .at(1)
        .simulate("click", {
            target: { id: channel.channel_id }
        });
    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith(`/myChannels/edit/${channel.channel_id}`);
});
