import React from "react";
import { connect } from "react-redux";
import { BrowsePostMenu } from "../MyPostSummary";
import { BrowseChannelsMenu } from "../ChannelListItem";
import { BrowseEventMenu } from "../MyEventSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";
import { searchPosts, clearPosts } from "../../actions/posts";
import { searchChannels, clearChannels } from "../../actions/channels";
import { searchEvents, clearEvents } from "../../actions/events";
import ChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import PostFilterSelector from "../filter_selectors/PostFilterSelector";
import { getVisibleChannels } from "../../selectors/myChannels";
import { getVisibleEvents } from "../../selectors/myEvents";
import { getVisiblePosts } from "../../selectors/myPosts";
import { resetChannelFilters } from "../../actions/channel_filters";
import { resetPostFilters } from "../../actions/post_filters";
import { resetEventFilters } from "../../actions/event_filters";

export class SearchResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            show: "all"
        };
    }

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    onShowChange = (e) => {
        this.props.resetChannelFilters();
        this.props.resetPostFilters();
        this.props.resetEventFilters();

        const show = e.target.value;
        this.setState({ show });
    };

    componentWillMount() {
        this.props.clearPosts();
        this.props.clearChannels();
        this.props.clearEvents();
        this.props.resetChannelFilters();
        this.props.resetPostFilters();
        this.props.resetEventFilters();

        let promises = [];

        const text = this.props.match.params.text;

        promises.push(this.props.searchPosts(text));
        promises.push(this.props.searchChannels(text));
        promises.push(this.props.searchEvents(text));

        Promise.all(promises)
            .then(() => {})
            .catch((err) => console.log(err));
    }

    render() {
        const channels =
            !!this.props.channels &&
            this.props.channelFilters &&
            getVisibleChannels(this.props.channels, this.props.channelFilters, false);

        const channels_menu = BrowseChannelsMenu(channels, this.state.selected);

        const posts =
            !!this.props.posts &&
            !!this.props.postFilters &&
            getVisiblePosts(this.props.posts, this.props.postFilters, false);

        const post_menu = !!posts && BrowsePostMenu(posts, this.state.selected);

        const events =
            !!this.props.events &&
            !!this.props.eventFilters &&
            getVisibleEvents(this.props.events, this.props.eventFilters, false);

        const events_menu = !!events && BrowseEventMenu(events, this.state.selected);

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Search Results for <span>{this.props.match.params.text}</span>
                        </h1>
                        <div className="page-header__actions">
                            <div className="input-group">
                                <div className="input-group__column">
                                    Show:
                                    <div className="input-group__item">
                                        <select
                                            className="select"
                                            defaultValue={this.state.show}
                                            onChange={this.onShowChange}
                                        >
                                            <option value="all">Show All</option>
                                            <option value="channels">Channels</option>
                                            <option value="posts">Posts</option>
                                            <option value="events">Events</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {this.state.show !== "all" && (
                                <div className="input-group">
                                    {this.state.show === "channels" && <ChannelFilterSelector />}
                                    {this.state.show === "posts" && <PostFilterSelector />}
                                    {this.state.show === "events" && <EventFilterSelector />}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    {(this.state.show === "all" || this.state.show === "channels") && (
                        <div className="horizontal-menu_wrapper">
                            <div className="menu_header">
                                <h1>Channels</h1>
                            </div>
                            {!!channels_menu && channels_menu.length === 0 ? (
                                <h2>No Matching Channels</h2>
                            ) : (
                                <ScrollMenu
                                    data={channels_menu}
                                    arrowLeft={ArrowLeft}
                                    arrowRight={ArrowRight}
                                    selected={this.state.selected}
                                    onSelect={this.onSelect}
                                />
                            )}
                        </div>
                    )}
                    {(this.state.show === "all" || this.state.show === "posts") && (
                        <div className="horizontal-menu_wrapper">
                            <div className="menu_header">
                                <h1>Posts</h1>
                            </div>
                            {!!post_menu && post_menu.length === 0 ? (
                                <h2>No Matching Posts</h2>
                            ) : (
                                <ScrollMenu
                                    data={post_menu}
                                    arrowLeft={ArrowLeft}
                                    arrowRight={ArrowRight}
                                    selected={this.state.selected}
                                    onSelect={this.onSelect}
                                />
                            )}
                        </div>
                    )}
                    {(this.state.show === "all" || this.state.show === "events") && (
                        <div className="horizontal-menu_wrapper">
                            <div className="menu_header">
                                <h1>Events</h1>
                            </div>
                            {!!events_menu && events_menu.length === 0 ? (
                                <h2>No Matching Events</h2>
                            ) : (
                                <ScrollMenu
                                    data={events_menu}
                                    arrowLeft={ArrowLeft}
                                    arrowRight={ArrowRight}
                                    selected={this.state.selected}
                                    onSelect={this.onSelect}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    channels: state.channels.channels,
    posts: state.posts.posts,
    events: state.events.events,
    channelFilters: state.channelFilters,
    postFilters: state.postFilters,
    eventFilters: state.eventFilters
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    searchPosts: (text) => dispatch(searchPosts(text)),
    clearChannels: () => dispatch(clearChannels()),
    searchChannels: (text) => dispatch(searchChannels(text)),
    clearEvents: () => dispatch(clearEvents()),
    searchEvents: (text) => dispatch(searchEvents(text)),
    resetChannelFilters: () => dispatch(resetChannelFilters()),
    resetPostFilters: () => dispatch(resetPostFilters()),
    resetEventFilters: () => dispatch(resetEventFilters())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPage);
