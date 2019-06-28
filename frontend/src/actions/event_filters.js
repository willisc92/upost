// SET_VISIBLE_FILTER
export const setVisibleFilter = (visible = false) => ({
    type: "SET_VISIBLE_FILTER",
    visible
});

// SORT_BY_ASCENDING_DATE
export const sortAscending = () => ({
    type: "SORT_BY_ASCENDING_DATE"
});

// SORT_BY_DESCENDING_DATE
export const sortDescending = () => ({
    type: "SORT_BY_DESCENDING_DATE"
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
