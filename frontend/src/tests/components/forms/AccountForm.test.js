import { AccountForm } from "../../../components/forms/AccountForm";
import { shallow } from "enzyme";
import React from "react";
import mockAxios from "axios";
import interests from "../../fixtures/interests";
import moment from "moment";

let wrapper, authState, onSubmit;

beforeEach(() => {
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: interests
        })
    );

    authState = { token: null, error: null, loading: false };
    onSubmit = jest.fn();
    wrapper = shallow(<AccountForm auth={authState} onSubmit={onSubmit} />);
});

test("Should render AccountForm", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should change birthdate", () => {
    const newDate = moment(10);
    wrapper.find("SingleDatePicker").prop("onDateChange")(newDate); // Use prop() returns change handler - call with the expected property.
    expect(wrapper.state("birthDate")).toEqual(newDate);
});

test("Should change calender focus", () => {
    const focused = true;
    wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
    expect(wrapper.state("calendarFocused")).toBe(focused);
});
