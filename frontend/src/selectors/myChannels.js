import moment from "moment";

export const getVisibleChannels = (channels, { text, sortBy, startDate, endDate }, deleted_flag) => {
    if (!!channels) {
        return channels
            .filter((channel) => {
                const createdAtMoment = moment(channel.creation_date, "YYYY-MM-DD");
                const lastUpdatedMoment = moment(channel.last_updated, "YYYY-MM-DD");
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
                const textMatch = channel.channel_name.toLowerCase().includes(text.toLowerCase());
                const visibleMatch = channel.deleted_flag === deleted_flag;
                return startDateMatch && endDateMatch && textMatch && visibleMatch;
            })
            .sort((a, b) => {
                if (sortBy === "date") {
                    return moment(a.creation_date) < moment(b.creation_date) ? 1 : -1;
                } else if (sortBy === "name") {
                    return a.channel_name.toLowerCase() < b.channel_name.toLowerCase() ? -1 : 1;
                } else if (sortBy === "last_updated") {
                    return moment(a.last_updated) < moment(b.last_updated) ? 1 : -1;
                }
            });
    }
};
