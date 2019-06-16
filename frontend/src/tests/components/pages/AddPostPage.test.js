import React from "react";
import { shallow } from "enzyme";
import { AddPostPage } from "../../../components/pages/AddPostPage";
import channels from "../../fixtures/channels";
import posts from "../../fixtures/posts";
import { writeHeapSnapshot } from "v8";

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

test("Should render page with Add Post form correctly upon page load", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should return to channels page", () => {
    wrapper.instance().handleReturn();
    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith(`/myChannels/${match.params.id}`);
});

test("Should handle triggering final submit", async () => {
    wrapper.instance().onTriggerSaveReturn();
    expect(wrapper.state("finished")).toBe(true);
});

test("Should handle triggering final submit", async () => {
    wrapper.instance().onTriggerSaveReturn();
    expect(wrapper.state("finished")).toBe(true);
});

test("Should handle intermediate submit and increment the step to Event", async () => {
    await wrapper.instance().onSubmit(posts[0]);
    expect(addPost).toHaveBeenCalledWith({ ...posts[0] });
    expect(wrapper.state("step")).toBe("Event");
    expect(wrapper).toMatchSnapshot();
});
