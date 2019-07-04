// SET_TEXT_FILTER
export const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});

// SET_VISIBLE_FILTER
export const setVisibleFilter = (visible = false) => ({
    type: "SET_VISIBLE_FILTER",
    visible
});

// SORT_BY_NAME
export const sortByName = () => ({
    type: "SORT_BY_NAME"
});

// SORT_BY_DATE
export const sortByDate = () => ({
    type: "SORT_BY_DATE"
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
});

//TODO: SET EVENT FILTER
//TODO: SET INCENTIVE FILTER
