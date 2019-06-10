import { Header } from "../../components/Header";
import { shallow } from "enzyme";
import React from "react";

test("Should render Header with valid token", () => {
    const logoutSpy = jest.fn();
    const token = 123;
    const wrapper = shallow(<Header token={token} logout={logoutSpy} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should render Header with no token", () => {
    const logoutSpy = jest.fn();
    const token = null;
    const wrapper = shallow(<Header token={token} logout={logoutSpy} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should call Logout function", () => {
    const logoutSpy = jest.fn();
    const token = 123;
    const wrapper = shallow(<Header token={token} logout={logoutSpy} />);
    wrapper.find("button").simulate("click");
    expect(logoutSpy).toHaveBeenCalled();
});
