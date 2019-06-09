import { ChannelForm } from "../../../components/forms/ChannelForm";
import { shallow } from "enzyme";
import React from "react";
import channels from "../../fixtures/channels";

let wrapper, onSubmitSpy, error;

beforeEach(() => {
    onSubmitSpy = jest.fn();
    error = undefined;
    wrapper = shallow(<ChannelForm error={error} onSubmit={onSubmitSpy} />);
});

test("Should render ChannelForm correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should render ChannelForm with existing channel data", () => {
    wrapper = shallow(<ChannelForm channel={channels[0]} error={error} onSubmit={onSubmitSpy} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should trigger onNameChange", () => {
    const value = "NEW NAME";
    wrapper
        .find("input")
        .at(0)
        .simulate("change", {
            target: { value }
        });
    expect(wrapper.state("channel_name")).toEqual(value);
});

test("Should trigger onDeletedFlagChange", () => {
    wrapper
        .find("input")
        .at(1)
        .simulate("change", {});

    expect(wrapper.state("deleted_flag")).toEqual(true);
});

test("Should trigger onDescriptionChange", () => {
    const value = "NEW DESCRIPTION";
    wrapper.find("textarea").simulate("change", {
        target: { value }
    });
    expect(wrapper.state("channel_description")).toEqual(value);
});

test("Should trigger onsubmit", () => {
    localStorage.clear();
    localStorage.setItem("user_ID", 123);
    wrapper = shallow(<ChannelForm channel={channels[0]} error={error} onSubmit={onSubmitSpy} />);
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    });
    expect(wrapper.state("error")).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        channel_name: wrapper.state("channel_name"),
        deleted_flag: wrapper.state("deleted_flag"),
        channel_description: wrapper.state("channel_description"),
        user: localStorage.getItem("user_id")
    });
});
