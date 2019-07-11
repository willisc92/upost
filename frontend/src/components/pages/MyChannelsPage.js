import React from "react";
import { getVisibleChannels } from "../../selectors/myChannels";
import { connect } from "react-redux";
import { startSetChannels } from "../../actions/channels";
import MyChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";
import ChannelListItem from "../ChannelListItem";

export class MyChannelsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
    }

    componentDidMount() {
        this.props.startSetChannels();
    }

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    handleAddChannel = () => {
        this.props.history.push("/addChannel");
    };

    render() {
        const channels = !!this.props.channels && this.props.channels;

        return (
            channels && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                <span>{localStorage.getItem("first_name")}</span> - Channels
                            </h1>
                            <div className="page-header__actions">
                                <MyChannelFilterSelector />
                                <button className="button" onClick={this.handleAddChannel}>
                                    Add a channel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="polaroid__container">
                            {channels.length > 0 ? (
                                channels.map((channel) => {
                                    return (
                                        <ChannelListItem
                                            channel={channel}
                                            key={channel.channel_id}
                                            pathName={`/myChannels/${channel.channel_id}`}
                                            inHorizontalMenu={false}
                                        />
                                    );
                                })
                            ) : (
                                <p>No Channels</p>
                            )}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channels: getVisibleChannels(state.channels.channels, state.channelFilters, false),
        loading: state.channels.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelsPage);
