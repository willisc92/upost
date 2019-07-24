// SET_TEXT_FILTER
export const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});

// SET_BY_LAST_UPDATED
export const sortByLastUpdated = () => ({
    type: "SORT_BY_LAST_UPDATED"
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
export const setStartDate = (startDate = null) => ({
    type: "SET_START_DATE",
    startDate
});

// SET_END_DATE
export const setEndDate = (endDate = null) => ({
    type: "SET_END_DATE",
    endDate
});

// RESET_CHANNEL_FILTERS
export const resetChannelFilters = () => ({
    type: "RESET_CHANNEL_FILTERS"
});
