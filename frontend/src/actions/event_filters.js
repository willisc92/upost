// SET_DEFAULT
export const setDefault = () => ({
    type: "SET_DEFAULT"
});

// SET_TEXT_FILTER
export const setTextFilter = (text) => ({
    type: "SET_TEXT_FILTER",
    text
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

// SET_START_DATE
export const setEndDate = (endDate) => ({
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
