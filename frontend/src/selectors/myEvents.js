import moment from "moment";

export const getVisibleEvents = (post, { sortBy, startDate, endDate, text }, deleted_flag) => {
    if (!!post && !!post.post_events) {
        return post.post_events
            .filter((event) => {
                const event_startDate = moment(event.planned_start_date);
                const event_endDate = moment(event.planned_end_date);
                const startDateMatch = startDate ? startDate.isSameOrBefore(event_startDate, "day") : true;
                const endDateMatch = endDate ? endDate.isSameOrAfter(event_endDate, "day") : true;
                const visibleMatch = event.deleted_flag == deleted_flag;
                const textMatch = event.event_title.toLowerCase().includes(text.toLowerCase());
                return startDateMatch && endDateMatch && visibleMatch && textMatch;
            })
            .sort((a, b) => {
                if (sortBy === "ascending_date") {
                    return a.planned_start_date < b.planned_start_date ? -1 : 1;
                } else if (sortBy === "descending_date") {
                    return a.planned_start_date < b.planned_start_date ? 1 : -1;
                }
            });
    }
};
