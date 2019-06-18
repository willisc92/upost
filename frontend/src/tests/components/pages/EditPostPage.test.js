import React from "react";
import { shallow } from "enzyme";
import { EditPostPage } from "../../../components/pages/EditPostPage";
import channels from "../../fixtures/channels";
import posts from "../../fixtures/posts";

let wrapper, match, editPost, startGetPost, history, post, clearPosts;

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

    clearPosts = jest.fn();

    editPost = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    startGetPost = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    localStorage.setItem("user_name", post.user);

    wrapper = shallow(
        <EditPostPage
            match={match}
            post={post}
            editPost={editPost}
            startGetPost={startGetPost}
            history={history}
            clearPosts={clearPosts}
        />
    );
});

test("Should render page correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should handle onSubmit and redirect on successful submission", async () => {
    let form_data = new FormData();
    form_data.append("picture", null);
    form_data.append("user", localStorage.getItem("user_id"));
    form_data.append("post_title", posts[0].post_title);
    form_data.append("poster_name", posts[0].poster_name);
    form_data.append("phone_number", posts[0].phone_number);
    form_data.append("cost", posts[0].cost);
    form_data.append("email", posts[0].email);
    form_data.append("post_description", posts[0].post_description);
    form_data.append("deleted_flag", posts[0].deleted_flag);

    await wrapper.instance().onSubmit(form_data);
    expect(editPost).toHaveBeenCalledWith(post.post_id, form_data);
    expect(history.push).toHaveBeenCalled();
});
