import { Interest } from "../../components/Interest";
import { shallow } from "enzyme";
import React from "react";
import interests from "../fixtures/interests";

test("Should render an interest component", () => {
    const interest = interests[0];
    const wrapper = shallow(<Interest interest={interest} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should call changeIsSelected", () => {
    const interest = interests[0];
    const changeIsSelectedSpy = jest.fn();
    const wrapper = shallow(<Interest interest={interest} changeIsSelected={changeIsSelectedSpy} />);
    wrapper.find("div").simulate("click");
    expect(changeIsSelectedSpy).toHaveBeenCalled();
    expect(changeIsSelectedSpy).toHaveBeenCalledWith(interests[0].interest_tag);
});
