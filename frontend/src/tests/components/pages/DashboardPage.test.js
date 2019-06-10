import React from "react";
import { shallow } from "enzyme";
import { DashboardPage } from "../../../components/pages/DashboardPage";

test("Should render Dashboard page for non logged in user", () => {
    const isAuthenticated = false;
    const wrapper = shallow(<DashboardPage isAuthenticated={isAuthenticated} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should render Dashboard page for logged in user", () => {
    const isAuthenticated = true;
    localStorage.setItem("first_name", "WILLIS");
    const wrapper = shallow(<DashboardPage isAuthenticated={isAuthenticated} />);
    expect(wrapper).toMatchSnapshot();
});
