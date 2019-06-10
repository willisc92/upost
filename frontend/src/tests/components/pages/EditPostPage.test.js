import React from "react";
import { shallow } from "enzyme";
import { EditPostPage } from "../../../components/pages/EditPostPage";
import channels from "../../fixtures/channels";
import posts from "../../fixtures/posts";

let wrapper, match, editPost, startGetPost, history, post;

beforeEach(() => {
    post = posts[0];
    match = {
        params: {
            id: post.post_id
        }
    };

    history = {
        push: jest.fn()
    };

    editPost = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    startGetPost = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    localStorage.setItem("user_name", post.user);

    wrapper = shallow(
        <EditPostPage match={match} post={post} editPost={editPost} startGetPost={startGetPost} history={history} />
    );
});

test("Should render page correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should handle onSubmit and redirect on successful submission", async () => {
    await wrapper.instance().onSubmit(post);
    expect(editPost).toHaveBeenCalledWith(post.post_id, post);
    expect(history.push).toHaveBeenCalledWith(`/myChannels/${post.channel}`);
});
