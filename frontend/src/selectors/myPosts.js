import moment from "moment";

export const getVisiblePosts = (posts, { text, sortBy, startDate, endDate }, deleted_flag) => {
    if (!!posts) {
        return posts
            .filter((post) => {
                const createdAtMoment = moment(post.post_timestamp, "YYYY-MM-DD");
                const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
                const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
                const textMatch = post.post_title.toLowerCase().includes(text.toLowerCase());
                const visibleMatch = post.deleted_flag === deleted_flag;
                return startDateMatch && endDateMatch && textMatch && visibleMatch;
            })
            .sort((a, b) => {
                if (sortBy === "date") {
                    return a.creation_date < b.creation_date ? 1 : -1;
                } else if (sortBy === "name") {
                    return a.post_title < b.post_title ? -1 : 1;
                }
            });
    }
};
