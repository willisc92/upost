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

export class MyChannelDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    componentDidMount() {
        const channel_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetChannel(channel_id)
                    .then((channel_res) => {
                        if (res.data.username !== channel_res.data[0].user) {
                            this.props.history.push("/myChannels");
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

    onSelect = (key) => {
        this.setState({ selected: key });
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
                this.props.history.push(`/myChannels/${channel_id}/`);
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
                this.props.history.push(`/myChannels/${channel_id}/`);
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
                console.log(JSON.stringify(err, null, 2));
            });
    };

    render() {
        const posts = !!this.props.posts && this.props.posts;

        return (
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        <Box paddingBottom={2}>
                            <Typography variant="h1" display="inline" gutterBottom>
                                Channel Page:{" "}
                            </Typography>
                            <Typography variant="h1" display="inline" color="primary" gutterBottom>
                                {this.props.channel.channel_name}
                            </Typography>
                        </Box>
                        {!!this.props.channel.channel_description && (
                            <Typography variant="h2" gutterBottom>
                                Description: {this.props.channel.channel_description}
                            </Typography>
                        )}
                        <Typography variant="h3" gutterBottom>
                            Creation Date: {moment(this.props.channel.creation_date).format("MMMM Do YYYY")}
                        </Typography>
                        {this.props.channel.deleted_flag && (
                            <Typography variant="h3" color="error" gutterBottom>
                                Deletion Date: {moment(this.props.channel.deletion_date).format("MMMM Do YYYY")} -
                                Restore the Channel To Add/Edit Posts
                            </Typography>
                        )}

                        {this.props.channel.deleted_flag ? (
                            <Button color="primary" variant="contained" onClick={this.restoreChannel}>
                                Restore Channel
                            </Button>
                        ) : (
                            <div>
                                <Button color="primary" variant="contained" onClick={this.handleAddPost}>
                                    Add a new post
                                </Button>{" "}
                                <Button
                                    id={this.props.channel.channel_id}
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleEditChannel}
                                >
                                    Edit this channel
                                </Button>{" "}
                                <Button
                                    id={this.props.channel.channel_id}
                                    color="primary"
                                    variant="contained"
                                    onClick={this.deleteChannel}
                                >
                                    Delete this Channel
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
                            </div>
                        )}
                        <Box marginTop={2}>
                            <MyPostFilterSelector />
                        </Box>
                    </Container>
                </Box>
                {posts !== [] && (
                    <Box paddingTop={2}>
                        <Container fixed>
                            <div className="polaroid__container">
                                {posts.length > 0 ? (
                                    posts.map((post) => {
                                        return (
                                            <MyPostSummary
                                                post={post}
                                                key={post.post_id}
                                                pathName={`/myPosts/${post.post_id}/edit`}
                                                readOnly={this.props.channel.deleted_flag}
                                                inHorizontalMenu={false}
                                            />
                                        );
                                    })
                                ) : (
                                    <Typography color="error" variant="h4">
                                        No Channels
                                    </Typography>
                                )}
                            </div>
                        </Container>
                    </Box>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.postFilters,
        channel: state.channels.channels.length === 1 && state.channels.channels[0],
        loading: state.channels.loading,
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
    deletePost: (id) => dispatch(deletePost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelDetail);
