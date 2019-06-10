import React from "react";
import { ChannelFilters } from "../../components/filter_selectors/ChannelFilterSelector";
import { shallow } from "enzyme";
import moment from "moment";

let filters, setTextFilter, setVisibleFilter, sortByName, sortByDate, sortByVisible, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    filters = {
        text: "",
        visible: true,
        sortBy: "name",
        startDate: null,
        endDate: null
    };
    setTextFilter = jest.fn();
    setVisibleFilter = jest.fn();
    sortByName = jest.fn();
    sortByDate = jest.fn();
    sortByVisible = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ChannelFilters
            setTextFilter={setTextFilter}
            setVisibleFilter={setVisibleFilter}
            sortByName={sortByName}
            sortByDate={sortByDate}
            sortByVisible={sortByVisible}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filters={filters}
        />
    );
});

test("Should render ChannelFilterSelector", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should handle text change", () => {
    const value = "New text";
    wrapper
        .find("input")
        .at(0)
        .simulate("change", {
            target: { value }
        });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("Should handle sort changes", () => {
    let value = "date";
    wrapper.find("select").simulate("change", {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled;

    value = "name";
    wrapper.find("select").simulate("change", {
        target: { value }
    });
    expect(sortByName).toHaveBeenCalled;
});

test("Should handle visible change", () => {
    wrapper
        .find("input")
        .at(1)
        .simulate("change", {
            target: { value: null }
        });
    expect(setVisibleFilter).toHaveBeenLastCalledWith(!filters.visible);
});

test("Should handle dates change", () => {
    const startDate = moment(5);
    const endDate = moment(10);
    wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("Should handle date focus change", () => {
    const calenderFocused = "endDate";
    wrapper.find("DateRangePicker").prop("onFocusChange")(calenderFocused);
    expect(wrapper.state("calenderFocused")).toBe(calenderFocused);
});
