import React from "react";
import NotFoundPage from "../../components/pages/NotFoundPage";
import { shallow } from "enzyme";

test("Should render NotFoundPage component", () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});
