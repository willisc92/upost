import moment from "moment";

export const getVisiblePosts = (posts, { text, sortBy, startDate, endDate, community }, deleted_flag) => {
    if (!!posts) {
        return posts
            .filter((post) => {
                const createdAtMoment = moment(post.post_timestamp, "YYYY-MM-DD");
                const lastUpdatedMoment = moment(post.last_updated, "YYYY-MM-DD");
                let startDateMatch = true;
                let endDateMatch = true;
                if (sortBy === "date") {
                    startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
                    endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
                }
                if (sortBy === "last_updated") {
                    startDateMatch = startDate ? startDate.isSameOrBefore(lastUpdatedMoment, "day") : true;
                    endDateMatch = endDate ? endDate.isSameOrAfter(lastUpdatedMoment, "day") : true;
                }
                const textMatch = post.post_title.toLowerCase().includes(text.toLowerCase());
                const visibleMatch = post.deleted_flag === deleted_flag;
                const communityMatch = post.community.includes(community);
                return startDateMatch && endDateMatch && textMatch && visibleMatch && communityMatch;
            })
            .sort((a, b) => {
                if (sortBy === "date") {
                    return moment(a.post_timestamp) < moment(b.post_timestamp) ? 1 : -1;
                } else if (sortBy === "name") {
                    return a.post_title.toLowerCase() < b.post_title.toLowerCase() ? -1 : 1;
                } else if (sortBy === "last_updated") {
                    return moment(a.last_updated) < moment(b.last_updated) ? 1 : -1;
                }
            });
    }
};
