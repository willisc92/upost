import React from "react";
import { connect } from "react-redux";
import { startSetChannels, restoreChannel } from "../../actions/channels";
import { restorePost } from "../../actions/posts";
import { restoreEvent } from "../../actions/events";
import { restoreIncentivePackage } from "../../actions/incentivePackage";
import { getDeletedContent } from "../../selectors/deletedContent";
import { MyEventMenu } from "../MyEventSummary";
import { MyChannelsMenu } from "../ChannelListItem";
import { MyPostMenu } from "../MyPostSummary";
import { MyIncentiveMenu } from "../MyIncentiveSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";

class DeletedContentPage extends React.Component {
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

    restoreAll = () => {
        const deleted_content = getDeletedContent(this.props.channels);

        const deleted_channels = deleted_content[0];
        const deleted_posts = deleted_content[1];
        const deleted_events = deleted_content[2];
        const deleted_incentives = deleted_content[3];

        let promises = [];

        deleted_channels.forEach((channel) => {
            promises.push(this.props.restoreChannel(channel.channel_id));
        });

        deleted_posts.forEach((post) => {
            promises.push(this.props.restorePost(post.post_id));
        });

        deleted_events.forEach((event) => {
            promises.push(this.props.restoreEvent(event.event_id));
        });

        deleted_incentives.forEach((incentive) => {
            promises.push(this.props.restoreIncentivePackage(incentive.incentive_package_id));
        });

        Promise.all(promises)
            .then(() => {
                this.props.startSetChannels();
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    render() {
        const deleted_content = getDeletedContent(this.props.channels);
        const deleted_channels = deleted_content[0];
        const deleted_posts = deleted_content[1];
        const deleted_events = deleted_content[2];
        const deleted_incentives = deleted_content[3];

        const channelMenu = MyChannelsMenu(deleted_channels, this.state.selected);
        const postMenu = MyPostMenu(deleted_posts, this.state.selected);
        const eventMenu = MyEventMenu(deleted_events, this.state.selected, false);
        const incentiveMenu = MyIncentiveMenu(deleted_incentives, this.state.selected);

        const has_deleted_content =
            deleted_channels.length > 0 ||
            deleted_posts.length > 0 ||
            deleted_events.length > 0 ||
            deleted_incentives.length > 0;

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Your Recycle Bin</h1>
                        <div className="page-header__actions">
                            {has_deleted_content && (
                                <button className="button" onClick={this.restoreAll}>
                                    Restore All
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    {!has_deleted_content && <h1>No Deleted Content</h1>}
                    {deleted_channels.length > 0 && (
                        <div className="horizontal-menu_wrapper">
                            <div className="menu_header">
                                <h1>Deleted Channels</h1>
                            </div>
                            <ScrollMenu
                                data={channelMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                            />
                        </div>
                    )}
                    {deleted_posts.length > 0 && (
                        <div className="horizontal-menu_wrapper">
                            <div className="menu_header">
                                <h1>Deleted posts</h1>
                            </div>
                            <ScrollMenu
                                data={postMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                            />
                        </div>
                    )}
                    {deleted_events.length > 0 && (
                        <div className="horizontal-menu_wrapper">
                            <div className="menu_header">
                                <h1>Deleted Events</h1>
                            </div>
                            <ScrollMenu
                                data={eventMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                            />
                        </div>
                    )}
                    {deleted_incentives.length > 0 && (
                        <div className="horizontal-menu_wrapper">
                            <div className="menu_header">
                                <h1>Deleted Incentives</h1>
                            </div>
                            <ScrollMenu
                                data={incentiveMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    channels: state.channels.channels
});

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels()),
    restoreChannel: (id) => dispatch(restoreChannel(id)),
    restorePost: (id) => dispatch(restorePost(id)),
    restoreEvent: (id) => dispatch(restoreEvent(id)),
    restoreIncentivePackage: (id) => dispatch(restoreIncentivePackage(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeletedContentPage);
