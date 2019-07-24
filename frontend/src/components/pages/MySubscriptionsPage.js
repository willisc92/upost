import React from "react";
import { connect } from "react-redux";
import { clearChannels, getSubscriptions } from "../../actions/channels";
import { getVisibleChannels } from "../../selectors/myChannels";
import { resetChannelFilters } from "../../actions/channel_filters";
import ChannelSummary from "../ChannelListItem";
import ChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";

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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Your Subscriptions</h1>
                        <div className="page-header__actions">
                            <ChannelFilterSelector />
                        </div>
                    </div>
                </div>

                <div className="content-container">
                    {channels ? (
                        <div className="polaroid__container">
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
                                <h1>You have no subscriptions.</h1>
                            ) : (
                                <h1>No Matching Channels</h1>
                            )}
                        </div>
                    ) : (
                        <div> Loading... </div>
                    )}
                </div>
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
