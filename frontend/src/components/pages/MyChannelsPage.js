import React from "react";
import { getVisibleChannels } from "../../selectors/myChannels";
import { connect } from "react-redux";
import { startSetChannels } from "../../actions/channels";
import { MyChannelsMenu } from "../MyChannelListItem";
import MyChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";

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
        const menu = !!this.props.channels && MyChannelsMenu(this.props.channels, this.state.selected);

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">{localStorage.getItem("first_name")} - Channel Pages</h1>
                        <div className="page-header__actions">
                            <MyChannelFilterSelector />
                            <button className="button" onClick={this.handleAddChannel}>
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
                            <div>
                                {this.props.length > 0 ? (
                                    <ScrollMenu
                                        data={menu}
                                        arrowLeft={ArrowLeft}
                                        arrowRight={ArrowRight}
                                        selected={this.state.selected}
                                        onSelect={this.onSelect}
                                    />
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
