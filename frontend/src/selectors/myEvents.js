import moment from "moment";

export const getVisibleEvents = (post, { visible, sortBy, startDate, endDate, text }) => {
    if (!!post && !!post.post_events) {
        return post.post_events
            .filter((event) => {
                const event_startDate = moment(event.planned_start_date);
                const event_endDate = moment(event.planned_end_date);
                const startDateMatch = startDate ? startDate.isSameOrBefore(event_startDate, "day") : true;
                const endDateMatch = endDate ? endDate.isSameOrAfter(event_endDate, "day") : true;
                const visibleMatch = !post.deleted_flag == visible;
                const textMatch = event.event_title.toLowerCase().includes(text.toLowerCase());
                return startDateMatch && endDateMatch && visibleMatch && textMatch;
            })
            .sort((a, b) => {
                if (sortBy === "ascending_date") {
                    return a.planned_start_date < b.planned_start_date ? -1 : 1;
                } else if (sortBy === "descending_date") {
                    return a.planned_start_date < b.planned_start_date ? 1 : -11;
                }
            });
    }
};
