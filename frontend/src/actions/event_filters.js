// RESET_EVENT_FILTERS
export const resetEventFilters = () => ({
    type: "RESET_EVENT_FILTERS"
});

// SET_TEXT_FILTER
export const setTextFilter = (text) => ({
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

// SET_START_DATE
export const setEndDate = (endDate = null) => ({
    type: "SET_END_DATE",
    endDate
});

// CLEAR_DATES
export const clearDates = () => ({
    type: "CLEAR_DATES"
});

export const setDayFilter = (dayFilter) => ({
    type: "SET_DAY_FILTER",
    dayFilter
});

// SET_COMMUNITY_FILTER
export const setCommunityFilter = (community) => ({
    type: "SET_COMMUNITY_FILTER",
    community
});

// SET_HAS_INCENTIVE_FILTER
export const setHasIncentiveFilter = (hasIncentive) => ({
    type: "SET_HAS_INCENTIVE_FILTER",
    hasIncentive
});

// SET_INCENTIVE_TYPE_FILTER
export const setIncentiveTypeFilter = (incentiveType) => ({
    type: "SET_INCENTIVE_TYPE_FILTER",
    incentiveType
});

// SET_DIET_OPTIONS_FILTER
export const setDietOptionsFilter = (dietOption) => ({
    type: "SET_DIET_OPTION_FILTER",
    dietOption
});
