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
                        <div className="list-body">
                            <div className="list-parent">
                                {this.props.length > 0 ? (
                                    this.props.channels.map((channel) => (
                                        <div className="list-box" key={channel.channel_id}>
                                            <MyChannelListItem {...channel} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No channels to show</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    channels: getVisibleChannels(state.channels.channels, state.channelFilters),
    length: getVisibleChannels(state.channels.channels, state.channelFilters).length,
    loading: state.channels.loading
});

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelsPage);
