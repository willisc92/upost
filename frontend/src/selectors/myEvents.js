import moment from "moment";

export const getVisibleEvents = (
    events,
    { sortBy, startDate, endDate, text, dayFilter, community, hasIncentive, incentiveType, dietOption },
    deleted_flag
) => {
    if (Array.isArray(events)) {
        return events
            .filter((event) => {
                const event_startDate = moment(event.planned_start_date);
                const event_endDate = moment(event.planned_end_date);
                const startDateMatch = startDate ? startDate.isSameOrBefore(event_startDate, "day") : true;
                const endDateMatch = endDate ? endDate.isSameOrAfter(event_endDate, "day") : true;
                const todayMatch = moment().isSame(moment(event.planned_start_date), "day");
                const tomorrowMatch = moment()
                    .add(1, "days")
                    .isSame(moment(event.planned_start_date), "day");
                const dateRangeMatch = startDateMatch && endDateMatch;

                var dayMatch;
                switch (dayFilter) {
                    case "all":
                        dayMatch = dateRangeMatch;
                        break;
                    case "today":
                        dayMatch = todayMatch;
                        break;
                    case "tomorrow":
                        dayMatch = tomorrowMatch;
                        break;
                    default:
                        dayMatch = true;
                }

                const visibleMatch = event.deleted_flag == deleted_flag;
                const textMatch = event.event_title.toLowerCase().includes(text.toLowerCase());
                const communityMatch = event.event_community.includes(community);
                const hasIncentiveMatch =
                    hasIncentive === "all" ||
                    (hasIncentive === "hasIncentive" && !!event.event_incentive) ||
                    (hasIncentive === "noIncentive" && !event.event_incentive);

                const incentiveTypesMatch =
                    incentiveType === "" ||
                    (!!event.event_incentive && event.event_incentive.incentive_type.includes(incentiveType));

                const dietOptionsMatch =
                    dietOption === "" ||
                    (!!event.event_incentive && event.event_incentive.diet_option.includes(dietOption));

                return (
                    visibleMatch &&
                    textMatch &&
                    dayMatch &&
                    communityMatch &&
                    hasIncentiveMatch &&
                    incentiveTypesMatch &&
                    dietOptionsMatch
                );
            })
            .sort((a, b) => {
                if (sortBy === "name") {
                    return a.event_title.toLowerCase() < b.event_title.toLowerCase() ? -1 : 1;
                }
                if (sortBy === "date") {
                    return moment(a.creation_date) < moment(b.creation_date) ? 1 : -1;
                } else if (sortBy === "last_updated") {
                    return moment(a.last_updated) < moment(b.last_updated) ? 1 : -1;
                }
            });
    }
};
