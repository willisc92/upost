import React from "react";
import { connect } from "react-redux";
import { clearChannels, getSubscriptions } from "../../actions/channels";
import { getVisibleChannels } from "../../selectors/myChannels";
import { resetChannelFilters } from "../../actions/channel_filters";
import ChannelSummary from "../ChannelListItem";
import ChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class MySubscriptionsPage extends React.Component {
    componentWillMount() {
        this.props.clearChannels();
        this.props.resetChannelFilters();

        this.props
            .getSubscriptions()
            .then(() => {})
            .catch((err) => console.log(err));
    }

    render() {
        const channels = !!this.props.channels && getVisibleChannels(this.props.channels, this.props.filters, false);

        return (
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" gutterBottom>
                            Your Subscriptions
                        </Typography>
                        <ChannelFilterSelector />
                    </Container>
                </Box>

                <Container maxWidth="xl">
                    {channels ? (
                        <Box display="flex" flexWrap="flex" py={2}>
                            {channels.length > 0 ? (
                                channels.map((channel) => {
                                    return (
                                        <ChannelSummary
                                            key={channel.channel_id}
                                            channel={channel}
                                            pathName={`/channel/${channel.channel_id}`}
                                            inHorizontalMenu={false}
                                        />
                                    );
                                })
                            ) : this.props.channels.length === 0 ? (
                                <Typography variant="h2">You have no subscriptions.</Typography>
                            ) : (
                                <Typography variant="h2">No Matching Channels</Typography>
                            )}
                        </Box>
                    ) : (
                        <Typography> Loading... </Typography>
                    )}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    channels: state.channels.channels,
    filters: state.channelFilters
});

const mapDispatchToProps = (dispatch) => ({
    clearChannels: () => dispatch(clearChannels()),
    getSubscriptions: () => dispatch(getSubscriptions()),
    resetChannelFilters: () => dispatch(resetChannelFilters())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySubscriptionsPage);
