import {
    setTextFilter,
    setVisibleFilter,
    sortByName,
    sortByDate,
    setStartDate,
    setEndDate
} from "../../actions/post_filters";
import moment from "moment";

test("Should return setTextFilter action object", () => {
    const text = "TEXT FILTER";
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text
    });
});

test("Should return setTextFilter action object with default value", () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: ""
    });
});

test("Should return setVisibleFilter action object", () => {
    const visible = true;
    const action = setVisibleFilter(visible);
    expect(action).toEqual({
        type: "SET_VISIBLE_FILTER",
        visible
    });
});

test("Should return setVisibleFilter action object with defaults", () => {
    const action = setVisibleFilter();
    expect(action).toEqual({
        type: "SET_VISIBLE_FILTER",
        visible: false
    });
});

test("Should return sortByName action object", () => {
    const action = sortByName();
    expect(action).toEqual({
        type: "SORT_BY_NAME"
    });
});

test("Should return sortByDate action object", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE"
    });
});

test("Shoudl return setStartDate action object", () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: "SET_START_DATE",
        startDate: moment(0)
    });
});

test("Shoudl return setEndDate action object", () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: "SET_END_DATE",
        endDate: moment(0)
    });
});
