import React from "react";
import { getVisibleChannels } from "../../selectors/myChannels";
import { connect } from "react-redux";
import { startSetChannels } from "../../actions/channels";
import MyChannelListItem from "../MyChannelListItem";
import MyChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";

class MyChannelsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.startSetChannels();
    }

    handleAddChannel = () => {
        this.props.history.push("/addChannel");
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">{localStorage.getItem("first_name")} - Channel Pages</h1>
                        <div className="page-header__actions">
                            <MyChannelFilterSelector />
                            <button className="button button--secondary" onClick={this.handleAddChannel}>
                                Add a channel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.loading === true ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            {this.props.channels.map((channel) => (
                                <MyChannelListItem key={channel.channel_id} {...channel} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    channels: getVisibleChannels(state.channels.channels, state.channelFilters),
    length: state.channels.length,
    loading: state.channels.loading
});

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelsPage);
