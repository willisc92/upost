import React from "react";
import { shallow } from "enzyme";
import { AddPostPage } from "../../../components/pages/AddPostPage";
import channels from "../../fixtures/channels";
import posts from "../../fixtures/posts";

let wrapper, match, channel, addPost, startGetChannel, history;

beforeEach(() => {
    channel = channels[0];
    match = {
        params: {
            id: channel.channel_id
        }
    };

    history = {
        push: jest.fn()
    };

    addPost = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    startGetChannel = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    localStorage.setItem("user_name", channel.user);

    wrapper = shallow(
        <AddPostPage
            match={match}
            channel={channel}
            addPost={addPost}
            startGetChannel={startGetChannel}
            history={history}
        />
    );
});

test("Should render page correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should handle onSubmit with successful submission", async () => {
    await wrapper.instance().onSubmit(posts[0]);
    expect(addPost).toHaveBeenCalledWith({ ...posts[0] });
    expect(history.push).toHaveBeenCalledWith(`/myChannels/${channel.channel_id}`);
});
