import React from "react";
import { startGetChannel, deleteChannel, restoreChannel } from "../../actions/channels";
import { deletePost } from "../../actions/posts";
import { connect } from "react-redux";
import moment from "moment";
import MyPostFilterSelector from "../filter_selectors/PostFilterSelector";
import { getVisiblePosts } from "../../selectors/myPosts";
import { getCurrentUser } from "../../actions/auth";
import MyPostSummary from "../MyPostSummary";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../actions/subscriptions";
import CustomStepper from "../CustomStepper";

export class ViewChannelPage extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isOwner: false,
            steps: [],
            activeStep: undefined
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        const channel_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetChannel(channel_id)
                    .then((channel_res) => {
                        if (res.data.username === channel_res.data[0].user) {
                            if (this._isMounted) {
                                this.setState(() => ({
                                    isOwner: true,
                                    steps: [
                                        { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                        { label: `Bulletin Board: ${this.props.channel.channel_name}`, onClick: null },
                                        { label: null, onClick: null }
                                    ],
                                    activeStep: 1
                                }));
                            }
                        } else {
                            if (channel_res.data[0].deleted_flag) {
                                this.props.history.push("/");
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });

        // check to see if subscriptions is provided
        if (!this.props.subscriptions) {
            this.props.startGetSubscriptions();
        }
    }

    updateSubscriptions = () => {
        this.props.startUpdateSubscriptions(this.props.channel.channel_id);
    };

    handleAddPost = () => {
        const channel_id = this.props.match.params.id;
        this.props.history.push(`/myChannels/${channel_id}/addPost`);
    };

    handleEditChannel = (e) => {
        const channel_id = this.props.match.params.id;
        this.props.history.push(`/myChannels/edit/${channel_id}`);
    };

    restoreChannel = (e) => {
        const channel_id = this.props.match.params.id;
        this.props
            .restoreChannel(channel_id)
            .then(() => {
                this.props.history.push(`/myDeletedContent`);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    deleteChannel = (e) => {
        const channel_id = this.props.match.params.id;
        this.props
            .deleteChannel(channel_id)
            .then(() => {
                this.props.history.push(`/myChannels`);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    deleteAllPosts = (e) => {
        let promises = [];
        const posts = this.props.posts;

        posts.forEach((post) => {
            promises.push(this.props.deletePost(post.post_id));
        });

        const channel_id = this.props.match.params.id;

        Promise.all(promises)
            .then(() => {
                this.props.startGetChannel(channel_id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    render() {
        const posts = !!this.props.posts && this.props.posts;
        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" gutterBottom>
                            Bulletin Board:{" "}
                            <Typography variant="inherit" display="inline" color="primary">
                                {this.props.channel.channel_name}
                            </Typography>{" "}
                            {!!this.props.subscriptions && (
                                <Button color="primary" variant="contained" onClick={this.updateSubscriptions}>
                                    {this.props.subscriptions.includes(this.props.channel.channel_id)
                                        ? "Unsubscribe"
                                        : "Subscribe"}
                                </Button>
                            )}
                        </Typography>
                        {!!this.props.channel.channel_description && (
                            <Typography variant="h2" gutterBottom>
                                Description: {this.props.channel.channel_description}
                            </Typography>
                        )}
                        <Typography variant="h4" gutterBottom>
                            Creation Date: {moment(this.props.channel.creation_date).format("MMMM Do YYYY")}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            Last Updated: {moment(this.props.channel.last_updated).format("MMMM Do YYYY")}
                        </Typography>
                        {this.props.channel.deleted_flag && (
                            <Typography variant="h4" color="error" gutterBottom>
                                Deletion Date: {moment(this.props.channel.deletion_date).format("MMMM Do YYYY")} -
                                Restore the Bulletin Board To Add/Edit Posts
                            </Typography>
                        )}
                        {this.state.isOwner && (
                            <React.Fragment>
                                {this.props.channel.deleted_flag ? (
                                    <Button color="primary" variant="contained" onClick={this.restoreChannel}>
                                        Restore Bulletin Board
                                    </Button>
                                ) : (
                                    <React.Fragment>
                                        <CustomStepper activeStep={this.state.activeStep} steps={this.state.steps} />
                                        <Button color="primary" variant="contained" onClick={this.handleAddPost}>
                                            Add a new post
                                        </Button>{" "}
                                        <Button
                                            id={this.props.channel.channel_id}
                                            color="primary"
                                            variant="contained"
                                            onClick={this.handleEditChannel}
                                        >
                                            Edit this Bulletin Board
                                        </Button>{" "}
                                        <Button
                                            id={this.props.channel.channel_id}
                                            color="primary"
                                            variant="contained"
                                            onClick={this.deleteChannel}
                                        >
                                            Delete this Bulletin Board
                                        </Button>{" "}
                                        {!!posts && posts.length > 0 && (
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                className="button"
                                                onClick={this.deleteAllPosts}
                                            >
                                                Delete All Posts
                                            </Button>
                                        )}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}
                        <Box marginTop={2}>
                            <MyPostFilterSelector />
                        </Box>
                    </Container>
                </Box>
                {posts !== [] && (
                    <Box paddingTop={2}>
                        <Container maxWidth="xl">
                            <Box display="flex" flexWrap="wrap">
                                {posts.length > 0 ? (
                                    posts.map((post) => {
                                        return (
                                            <MyPostSummary
                                                post={post}
                                                key={post.post_id}
                                                pathName={`/post/${post.post_id}`}
                                                readOnly={this.props.channel.deleted_flag}
                                                inHorizontalMenu={false}
                                            />
                                        );
                                    })
                                ) : (
                                    <Typography color="error" variant="h4">
                                        No Posts
                                    </Typography>
                                )}
                            </Box>
                        </Container>
                    </Box>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.postFilters,
        channel: state.channels.channels.length === 1 && state.channels.channels[0],
        loading: state.channels.loading,
        subscriptions: state.subscriptions.subscriptions,
        posts:
            state.channels.channels.length === 1
                ? getVisiblePosts(
                      state.channels.channels[0].channel_posts,
                      state.postFilters,
                      state.channels.channels[0].deleted_flag
                  )
                : []
    };
};

const mapDispatchToProps = (dispatch) => ({
    startGetChannel: (id) => dispatch(startGetChannel(id)),
    deleteChannel: (id) => dispatch(deleteChannel(id)),
    restoreChannel: (id) => dispatch(restoreChannel(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    startGetSubscriptions: () => dispatch(startGetSubscriptions()),
    startUpdateSubscriptions: (id) => dispatch(startUpdateSubscriptions(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewChannelPage);
