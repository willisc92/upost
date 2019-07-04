import moment from "moment";

export const getVisibleIncentives = (post, { visible, sortBy, startDate, endDate, type }) => {
    if (!!post && !!post.post_incentives) {
        return post.post_incentives
            .filter((incentive) => {
                const incentive_startDate = moment(incentive.planned_start_date);
                const incentive_endDate = moment(incentive.planned_end_date);
                const startDateMatch = startDate ? startDate.isSameOrBefore(incentive_startDate, "day") : true;
                const endDateMatch = endDate ? endDate.isSameOrAfter(incentive_endDate, "day") : true;
                const visibleMatch = !post.deleted_flag == visible;
                const typeMatch = incentive.incentive_type === type || type === "";
                return startDateMatch && endDateMatch && visibleMatch && typeMatch;
            })
            .sort((a, b) => {
                if (sortBy === "date") {
                    return a.planned_start_date < b.planned_start_date ? -1 : 1;
                } else if (sortBy === "type") {
                    return a.type < b.type ? -1 : 1;
                }
            });
    }
};
