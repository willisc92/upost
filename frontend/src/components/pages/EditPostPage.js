import React from "react";
import { startGetPost, editPost, clearPosts, deletePost, restorePost } from "../../actions/posts";
import { connect } from "react-redux";
import PostForm from "../forms/PostForm";
import { getCurrentUser } from "../../actions/auth";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CustomStepper from "../CustomStepper";

export class EditPostPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: [],
            activeStep: undefined
        };
    }

    componentDidMount() {
        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetPost(post_id)
                    .then((post_res) => {
                        if (res.data.username !== post_res.data[0].user) {
                            this.props.history.push("/myChannels");
                        } else {
                            this.setState(() => ({
                                steps: [
                                    { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                    {
                                        label: `Bulletin Board`,
                                        onClick: this.goToChannel
                                    },
                                    { label: `Post: ${this.props.post.post_title}`, onClick: this.moveToPost },
                                    { label: "Edit Post", onClick: null },
                                    { label: "?", onClick: null }
                                ],
                                activeStep: 3
                            }));
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

    onSubmit = (post) => {
        const post_id = this.props.match.params.id;
        this.props
            .editPost(post_id, post)
            .then((result) => {
                if (post.toString() == "[object FormData]") {
                    this.props.history.push(`/channels/${post.get("channel")}`);
                } else {
                    this.props.history.push(`/channels/${post.channel}`);
                }
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    onEditIncentiveClick = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/editIncentive`);
    };

    onAddIncentiveClick = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/addIncentive`);
    };

    onEditEventsClick = () => {
        this.props.history.push(`/post-events/${this.props.match.params.id}`);
    };

    deletePost = () => {
        const id = this.props.post.post_id;
        this.props
            .deletePost(id)
            .then(() => {
                this.goToChannel();
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    restorePost = () => {
        const id = this.props.post.post_id;
        this.props
            .restorePost(id)
            .then(() => {
                this.props.history.push(`/myPosts/${id}/edit`);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    goToChannel = () => {
        const channel = this.props.post.channel;
        this.props.history.push(`/channels/${channel}`);
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    moveToPost = () => {
        this.props.history.push(`/post/${this.props.post.post_id}`);
    };

    render() {
        const read_only_channel = !!this.props.post && this.props.post.channel_deleted_flag;
        const read_only_post = !!this.props.post && this.props.post.deleted_flag;

        return (
            !!this.props.post && (
                <div>
                    <Box bgcolor="secondary.main" py={3}>
                        <Container maxWidth="xl">
                            <Typography variant="h1" gutterBottom>
                                Edit Post:{" "}
                                <Typography variant="inherit" display="inline" color="primary">
                                    {this.props.post && this.props.post.post_title}
                                </Typography>
                            </Typography>
                            {read_only_channel ? (
                                <Box>
                                    <Typography variant="h2" color="error" gutterBottom>
                                        You must restore the bulletin board of this post before editing.
                                    </Typography>
                                    <Button color="primary" variant="contained" onClick={this.goToChannel}>
                                        Go to Bulletin Board
                                    </Button>
                                </Box>
                            ) : read_only_post ? (
                                <Box>
                                    <Typography variant="h2" color="error" gutterBottom>
                                        You must restore this post before editing.
                                    </Typography>
                                    <Button color="primary" variant="contained" onClick={this.restorePost}>
                                        Restore Post
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    <CustomStepper steps={this.state.steps} activeStep={this.state.activeStep} />
                                    <Button color="primary" variant="contained" onClick={this.onEditEventsClick}>
                                        Add/Edit Events
                                    </Button>{" "}
                                    {!!this.props.post.post_incentive ? (
                                        <Button color="primary" variant="contained" onClick={this.onEditIncentiveClick}>
                                            Edit Post Perk
                                        </Button>
                                    ) : (
                                        <Button color="primary" variant="contained" onClick={this.onAddIncentiveClick}>
                                            Add Perk to Post
                                        </Button>
                                    )}{" "}
                                    <Button color="primary" variant="contained" onClick={this.deletePost}>
                                        Delete Post
                                    </Button>
                                </Box>
                            )}
                        </Container>
                    </Box>
                    <Container maxWidth="xl">
                        <Box py={3}>
                            {!!this.props.post && (
                                <PostForm
                                    onSubmit={this.onSubmit}
                                    channel={this.props.post.channel}
                                    post={this.props.post}
                                    nextStep="Save Changes"
                                    read_only={read_only_channel || read_only_post}
                                />
                            )}
                        </Box>
                    </Container>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.posts.loading,
    post: state.posts.posts[0]
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id)),
    editPost: (id, updates) => dispatch(editPost(id, updates)),
    deletePost: (id) => dispatch(deletePost(id)),
    restorePost: (id) => dispatch(restorePost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostPage);
