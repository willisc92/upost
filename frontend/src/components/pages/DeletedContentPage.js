import React from "react";
import { connect } from "react-redux";
import { startSetChannels, restoreChannel } from "../../actions/channels";
import { restorePost } from "../../actions/posts";
import { restoreEvent } from "../../actions/events";
import { restoreIncentivePackage } from "../../actions/incentivePackage";
import { getDeletedContent } from "../../selectors/deletedContent";
import { BrowseEventMenu } from "../MyEventSummary";
import { BrowseChannelsMenu } from "../ChannelListItem";
import { BrowsePostMenu } from "../MyPostSummary";
import { MyIncentiveMenu } from "../MyIncentiveSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuHeader from "../menus/MenuHeader";

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

        const channelMenu = BrowseChannelsMenu(deleted_channels, this.state.selected, true);
        const postMenu = BrowsePostMenu(deleted_posts, this.state.selected, true);
        const eventMenu = BrowseEventMenu(deleted_events, this.state.selected, true);
        const incentiveMenu = MyIncentiveMenu(deleted_incentives, this.state.selected);

        const has_deleted_content =
            deleted_channels.length > 0 ||
            deleted_posts.length > 0 ||
            deleted_events.length > 0 ||
            deleted_incentives.length > 0;

        return (
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" gutterBottom>
                            Your Recycle Bin
                        </Typography>
                        {has_deleted_content && (
                            <Button variant="contained" color="primary" onClick={this.restoreAll}>
                                Restore All
                            </Button>
                        )}
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    {!has_deleted_content && (
                        <Box py={2}>
                            <Typography variant="h2">No Deleted Content</Typography>
                        </Box>
                    )}
                    {deleted_channels.length > 0 && (
                        <Box py={2}>
                            {MenuHeader("Deleted Bulletin Boards")}
                            <ScrollMenu
                                data={channelMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                                hideArrows
                                hideSingleArrow
                                alignCenter={false}
                            />
                        </Box>
                    )}
                    {deleted_posts.length > 0 && (
                        <Box py={2}>
                            {MenuHeader("Deleted Posts")}
                            <ScrollMenu
                                data={postMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                                hideArrows
                                hideSingleArrow
                                alignCenter={false}
                            />
                        </Box>
                    )}
                    {deleted_events.length > 0 && (
                        <Box py={2}>
                            {MenuHeader("Deleted Events")}
                            <ScrollMenu
                                data={eventMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                                hideArrows
                                hideSingleArrow
                                alignCenter={false}
                            />
                        </Box>
                    )}
                    {deleted_incentives.length > 0 && (
                        <Box py={2}>
                            {MenuHeader("Deleted Perks")}
                            <ScrollMenu
                                data={incentiveMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                                hideArrows
                                hideSingleArrow
                                alignCenter={false}
                            />
                        </Box>
                    )}
                </Container>
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
