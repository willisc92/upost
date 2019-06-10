import { SideBar } from "../../components/SideBar";
import { shallow } from "enzyme";
import React from "react";

test("Should render sidebar", () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper).toMatchSnapshot();
});
