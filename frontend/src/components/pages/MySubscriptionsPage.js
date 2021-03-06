import React from "react";
import { connect } from "react-redux";
import { clearChannels, getSubscriptions } from "../../actions/channels";
import { getVisibleChannels } from "../../selectors/myChannels";
import { resetChannelFilters } from "../../actions/channel_filters";
import ChannelSummary from "../ChannelListItem";
import ChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";
import { HelpToolTip } from "../HelpTooltip";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Loading from "./LoadingPage";

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
                            My Subscriptions
                            <HelpToolTip
                                jsx={
                                    <React.Fragment>
                                        <Typography variant="caption">
                                            Here you can see all bulletin boards that you have subscribed to!
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </Typography>
                        <ChannelFilterSelector />
                    </Container>
                </Box>

                <Container maxWidth="xl">
                    <Box py={2}>
                        {channels ? (
                            channels.length > 0 ? (
                                <Box display="flex" flexWrap="wrap">
                                    {channels.map((channel) => {
                                        return (
                                            <ChannelSummary
                                                key={channel.channel_id}
                                                channel={channel}
                                                pathName={`/channel/${channel.channel_id}`}
                                                inHorizontalMenu={false}
                                            />
                                        );
                                    })}
                                </Box>
                            ) : this.props.channels.length === 0 ? (
                                <Typography variant="h2">You have no subscriptions.</Typography>
                            ) : (
                                <Typography variant="h2">No Matching Bulletin Boards</Typography>
                            )
                        ) : (
                            <Box py={2}>
                                <Loading />
                            </Box>
                        )}
                    </Box>
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
