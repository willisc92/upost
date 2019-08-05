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

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MenuHeader from "../menus/MenuHeader";
import ButtonBase from "@material-ui/core/ButtonBase";

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

        const channels_menu = BrowseChannelsMenu(channels, this.state.selected, false);

        const posts =
            !!this.props.posts &&
            !!this.props.postFilters &&
            getVisiblePosts(this.props.posts, this.props.postFilters, false);

        const post_menu = !!posts && BrowsePostMenu(posts, this.state.selected, false);

        const events =
            !!this.props.events &&
            !!this.props.eventFilters &&
            getVisibleEvents(this.props.events, this.props.eventFilters, false);

        const events_menu = !!events && BrowseEventMenu(events, this.state.selected, false);

        const no_search_results = channels.length === 0 && posts.length === 0 && events.length === 0;

        return (
            <Box>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        <Typography variant="h1" gutterBottom>
                            Search Results for:{" "}
                            <Typography variant="inherit" display="inline" color="primary">
                                {this.props.match.params.text}
                            </Typography>
                        </Typography>

                        <Box display="flex" flexDirection="column">
                            <Typography>Show:</Typography>
                            <Box display="flex">
                                <Box bgcolor="white" border={0.1} borderColor="#cacccd" flexShrink={1}>
                                    <Select
                                        className="select"
                                        value={this.state.show}
                                        onChange={this.onShowChange}
                                        variant="outlined"
                                        disableUnderline
                                    >
                                        <MenuItem value="all">Show All</MenuItem>
                                        <MenuItem value="channels">Channels</MenuItem>
                                        <MenuItem value="posts">Posts</MenuItem>
                                        <MenuItem value="events">Events</MenuItem>
                                    </Select>
                                </Box>
                            </Box>
                        </Box>
                        {this.state.show !== "all" && (
                            <React.Fragment>
                                {this.state.show === "channels" && <ChannelFilterSelector />}
                                {this.state.show === "posts" && <PostFilterSelector />}
                                {this.state.show === "events" && <EventFilterSelector />}
                            </React.Fragment>
                        )}
                    </Container>
                </Box>
                <Container fixed>
                    {no_search_results ? (
                        <Box py={2}>
                            <Typography variant="h2">
                                Oops! No results were found. Click{" "}
                                <Typography variant="inherit" color="primary">
                                    <ButtonBase
                                        onClick={() => {
                                            this.props.history.push("/inspire_me");
                                        }}
                                    >
                                        here
                                    </ButtonBase>
                                </Typography>{" "}
                                for something interesting instead!
                            </Typography>
                        </Box>
                    ) : (
                        <Box>
                            {(this.state.show === "all" || this.state.show === "channels") && (
                                <Box py={2}>
                                    {MenuHeader("Channels")}
                                    {!!channels_menu && channels_menu.length === 0 ? (
                                        <Box py={2} fontWeight="fontWeightMedium">
                                            <Typography>No Matching Channels</Typography>
                                        </Box>
                                    ) : (
                                        <ScrollMenu
                                            data={channels_menu}
                                            arrowLeft={ArrowLeft}
                                            arrowRight={ArrowRight}
                                            selected={this.state.selected}
                                            onSelect={this.onSelect}
                                            hideArrows
                                            hideSingleArrow
                                        />
                                    )}
                                </Box>
                            )}
                            {(this.state.show === "all" || this.state.show === "posts") && (
                                <Box py={2}>
                                    {MenuHeader("Posts")}
                                    {!!post_menu && post_menu.length === 0 ? (
                                        <Box py={2} fontWeight="fontWeightMedium">
                                            <Typography>No Matching Posts</Typography>
                                        </Box>
                                    ) : (
                                        <ScrollMenu
                                            data={post_menu}
                                            arrowLeft={ArrowLeft}
                                            arrowRight={ArrowRight}
                                            selected={this.state.selected}
                                            onSelect={this.onSelect}
                                            hideArrows
                                            hideSingleArrow
                                        />
                                    )}
                                </Box>
                            )}
                            {(this.state.show === "all" || this.state.show === "events") && (
                                <Box py={2}>
                                    {MenuHeader("Events")}
                                    {!!events_menu && events_menu.length === 0 ? (
                                        <Box py={2} fontWeight="fontWeightMedium">
                                            <Typography>No Matching Events</Typography>
                                        </Box>
                                    ) : (
                                        <ScrollMenu
                                            data={events_menu}
                                            arrowLeft={ArrowLeft}
                                            arrowRight={ArrowRight}
                                            selected={this.state.selected}
                                            onSelect={this.onSelect}
                                            hideArrows
                                            hideSingleArrow
                                        />
                                    )}
                                </Box>
                            )}
                        </Box>
                    )}
                </Container>
            </Box>
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
