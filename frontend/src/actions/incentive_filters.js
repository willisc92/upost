// SET_VISIBLE_FILTER
export const setVisibleFilter = (visible = false) => ({
    type: "SET_VISIBLE_FILTER",
    visible
});

// SET_TEXT_FILTER
export const setTypeFilter = (type_filter) => ({
    type: "SET_TYPE_FILTER",
    type_filter
});

// SORT_BY_DATE
export const sortByDate = () => ({
    type: "SORT_BY_DATE"
});

// SORT_BY_TYPE
export const sortByType = () => ({
    type: "SORT_BY_TYPE"
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
