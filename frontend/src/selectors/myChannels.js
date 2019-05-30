import moment from "moment";

export const getVisibleChannels = (channels, { text, visible, sortBy, startDate, endDate }) => {
    if (!!channels) {
        return channels
            .filter((channel) => {
                const createdAtMoment = moment(channel.creation_date, "YYYY-MM-DD");
                const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
                const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
                const textMatch = channel.channel_name.toLowerCase().includes(text.toLowerCase());
                const visibleMatch = !channel.deleted_flag == visible;
                return startDateMatch && endDateMatch && textMatch && visibleMatch;
            })
            .sort((a, b) => {
                if (sortBy === "date") {
                    return a.creation_date < b.creation_date ? 1 : -1;
                } else if (sortBy === "name") {
                    return a.channel_name < b.channel_name ? -1 : 1;
                } else if (sortBy === "visible") {
                    return a.deleted_flag > b.deleted_flag ? 1 : -1;
                }
            });
    }
};
