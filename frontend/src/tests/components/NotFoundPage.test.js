import React from "react";
import NotFoundPage from "../../components/NotFoundPage";
import { shallow } from "enzyme";

test("Should render NotFoundPage component", () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});
