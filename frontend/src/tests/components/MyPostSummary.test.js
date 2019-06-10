import { MyPostSummary } from "../../components/MyPostSummary";
import { shallow } from "enzyme";
import React from "react";
import posts from "../fixtures/posts";

test("Should render MyPostSummary", () => {
    const post = posts[0];
    const wrapper = shallow(<MyPostSummary post={post} />);
    expect(wrapper).toMatchSnapshot();
});
