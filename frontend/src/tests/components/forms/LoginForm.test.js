import { LoginForm } from "../../../components/forms/LoginForm";
import { shallow } from "enzyme";
import React from "react";

let wrapper, error, authLoginSpy;

beforeEach(() => {
    authLoginSpy = jest.fn();
    error = undefined;
    wrapper = shallow(<LoginForm error={error} authLogin={authLoginSpy} />);
});

test("Should render login form", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should trigger onUserNameChange", () => {
    const value = "NEW NAME";
    wrapper
        .find("input")
        .at(0)
        .simulate("change", {
            target: { value }
        });
    expect(wrapper.state("username")).toEqual(value);
});

test("Should trigger onPasswordChange", () => {
    const value = "NEW PASSWORD";
    wrapper
        .find("input")
        .at(1)
        .simulate("change", {
            target: { value }
        });
    expect(wrapper.state("password")).toEqual(value);
});

test("Should trigger onsubmit with valid data", () => {
    const username = "username";
    const password = "password";

    wrapper
        .find("input")
        .at(0)
        .simulate("change", {
            target: { value: username }
        });

    wrapper
        .find("input")
        .at(1)
        .simulate("change", {
            target: { value: password }
        });

    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    });

    expect(wrapper.state("error")).toBe("");
    expect(authLoginSpy).toHaveBeenCalledWith(wrapper.state("username"), wrapper.state("password"));
});
