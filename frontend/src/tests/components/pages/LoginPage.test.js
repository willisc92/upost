import { shallow } from "enzyme";
import { LoginPage } from "../../../components/pages/LoginPage";
import React from "react";

test("Should Render LoginPage", () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test("Should call createAccount on button click", () => {
    let wrapper = shallow(<LoginPage />);
    const instance = wrapper.instance();
    instance.createAccount = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find("button").simulate("click");
    expect(instance.createAccount).toHaveBeenCalled();
});
