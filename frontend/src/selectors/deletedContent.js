export const getDeletedContent = (channelsList) => {
    const deletedContent = [];
    const deleted_channels = [];
    const deleted_posts = [];
    const deleted_events = [];
    const deleted_incentives = [];

    if (!!channelsList) {
        channelsList.forEach((channel) => {
            if (channel.deleted_flag) {
                deleted_channels.push(channel);
            }

            channel.channel_posts.forEach((post) => {
                if (post.deleted_flag) {
                    deleted_posts.push(post);
                }

                if (!!post.post_incentive && post.post_incentive.deleted_flag) {
                    deleted_incentives.push(post.post_incentive);
                }

                post.post_events.forEach((event) => {
                    if (event.deleted_flag) {
                        deleted_events.push(event);
                    }

                    if (!!event.event_incentive && event.event_incentive.deleted_flag) {
                        deleted_incentives.push(event.event_incentive);
                    }
                });
            });
        });
    }

    deletedContent.push(deleted_channels);
    deletedContent.push(deleted_posts);
    deletedContent.push(deleted_events);
    deletedContent.push(deleted_incentives);

    return deletedContent;
};
