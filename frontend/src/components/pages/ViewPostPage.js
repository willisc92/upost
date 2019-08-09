import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startGetPost, clearPosts, deletePost, restorePost } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../actions/subscriptions";
import IncentivePackage from "../IncentivePackage";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { getCurrentUser } from "../../actions/auth";
import moment from "moment";
import CustomStepper from "../CustomStepper";
import { ShareGroup } from "../Share";
import { baseURL } from "../../utils/baseURL";
import { HelpToolTip } from "../HelpTooltip";
import { PostDescription } from "../tooltip_descriptions/Descriptions";

class ViewPostPage extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isOwner: false,
            steps: [],
            activeStep: undefined,
            url: baseURL.concat(this.props.location.pathname)
        };
    }

    componentDidMount() {
        this._isMounted = true;

        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        this.props
            .startGetPost(post_id)
            .then((res) => {
                this.props
                    .startGetChannel(this.props.post.channel)
                    .catch((err) => {
                        console.log("error in getting channel information", err);
                    })
                    .then(() => {
                        getCurrentUser()
                            .then((user_res) => {
                                const isOwner = user_res.data.username === res.data[0].user;

                                if (this._isMounted) {
                                    this.setState(() => ({
                                        isOwner
                                    }));
                                }

                                if (!isOwner) {
                                    if (res.data[0].deleted_flag) {
                                        this.props.history.push("/");
                                    } else {
                                        this.setState(() => ({
                                            steps: [
                                                {
                                                    label: `Bulletin Board: ${this.props.channel.channel_name}`,
                                                    onClick: this.moveToBulletinBoard
                                                },
                                                { label: `Post: ${this.props.post.post_title}`, onClick: null },
                                                { label: "See Events", onClick: this.moveToPostEventsPage }
                                            ],
                                            activeStep: 1
                                        }));
                                    }
                                } else {
                                    this.setState(() => ({
                                        steps: [
                                            { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                            {
                                                label: `Bulletin Board: ${this.props.channel.channel_name}`,
                                                onClick: this.moveToBulletinBoard
                                            },
                                            { label: `Post: ${this.props.post.post_title}`, onClick: null },
                                            { label: null, onClick: null }
                                        ],
                                        activeStep: 2
                                    }));
                                }
                            })
                            .catch((err) => console.log(err));
                    });
            })
            .catch((err) => {
                console.log("error in getting post information", JSON.stringify(err, null, 2));
            });

        // check to see if subscriptions is provided
        if (!this.props.subscriptions) {
            this.props.startGetSubscriptions();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateSubscriptions = () => {
        this.props.startUpdateSubscriptions(this.props.channel.channel_id);
    };

    moveToPostEventsPage = () => {
        this.props.history.push(`/post-events/${this.props.post.post_id}`);
    };

    editPost = () => {
        this.props.history.push(`/myPosts/${this.props.post.post_id}/edit/`);
    };

    deletePost = () => {
        const id = this.props.post.post_id;
        this.props
            .deletePost(id)
            .then(() => {
                this.moveToBulletinBoard();
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
                this.props.history.push(`/post/${id}`);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    moveToBulletinBoard = () => {
        this.props.history.push(`/channel/${this.props.channel.channel_id}`);
    };

    render() {
        const post = !!this.props.post && this.props.post;

        return (
            post && (
                <React.Fragment>
                    <Box bgcolor="secondary.main" py={3}>
                        <Container maxWidth="xl">
                            <Typography variant="h1">
                                Post
                                <HelpToolTip
                                    jsx={
                                        <React.Fragment>
                                            <Typography variant="caption">
                                                {PostDescription}
                                                <br />
                                                <br />
                                                From here you can:
                                                <ul>
                                                    <li>See all specific post details. </li>
                                                    <li>
                                                        Subscribe/unsubscribe to the bulletin board containing this post
                                                    </li>
                                                    <li>See any perks that are tied to this post.</li>
                                                    <li>Share the link to this post on Twitter, Facebook, or E-mail</li>
                                                    <li>See all the events that are tied to this post.</li>
                                                    {this.state.isOwner && (
                                                        <React.Fragment>
                                                            <li>Delete or restore this post</li>
                                                            <li>Edit this post</li>
                                                        </React.Fragment>
                                                    )}
                                                </ul>
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                {!!this.props.location.state && !!this.props.location.state.fromRandom && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            this.props.history.push("/inspire_me");
                                        }}
                                    >
                                        Inspire Me Again!
                                    </Button>
                                )}
                            </Typography>
                            <CustomStepper steps={this.state.steps} activeStep={this.state.activeStep} />
                        </Container>
                    </Box>
                    <Container maxWidth="xl">
                        <Box display="flex">
                            {!!this.props.post && (
                                <div className="content-container-twothirds">
                                    <img
                                        className="post-image"
                                        src={
                                            !!this.props.post.picture
                                                ? this.props.post.picture
                                                : CDNLink + "/dist/images/polaroid_default.png"
                                        }
                                    />
                                    <Box display="flex" justifyContent="space-between" py={2}>
                                        <Box width="50%">
                                            <Box paddingRight={0.5}>
                                                <Typography variant="h2" color="primary">
                                                    {this.props.post.post_title}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            {this.state.isOwner &&
                                                (this.props.post.deleted_flag ? (
                                                    <React.Fragment>
                                                        <Typography variant="h3" color="error" gutterBottom>
                                                            Deletion Date:{" "}
                                                            {moment(this.props.post.deletion_date).format(
                                                                "MMMM Do YYYY"
                                                            )}
                                                        </Typography>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={this.restorePost}
                                                        >
                                                            Restore Post
                                                        </Button>{" "}
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={this.deletePost}
                                                        >
                                                            Delete Post
                                                        </Button>{" "}
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.editPost}
                                                        >
                                                            Edit Post
                                                        </Button>{" "}
                                                    </React.Fragment>
                                                ))}

                                            {(this.state.isOwner ||
                                                (!this.state.isOwner && this.props.post.post_events.length > 0)) && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.moveToPostEventsPage}
                                                >
                                                    See Events
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
                                    <ShareGroup url={this.state.url} quote={this.props.post.post_title} />

                                    <Typography variant="body1" gutterBottom noWrap>
                                        Description: {this.props.post.post_description}
                                    </Typography>
                                    {!!this.props.post.post_incentive && (
                                        <IncentivePackage package={this.props.post.post_incentive} />
                                    )}
                                </div>
                            )}
                            <div className="content-container-onethirds">
                                {!!this.props.channel && (
                                    <React.Fragment>
                                        <Link
                                            className="post__link"
                                            to={{
                                                pathname: `/channel/${this.props.channel.channel_id}`
                                            }}
                                        >
                                            <Box paddingTop={2}>
                                                <Typography variant="h3" color="primary">
                                                    {this.props.channel.channel_name}
                                                </Typography>
                                            </Box>
                                        </Link>
                                        {!!this.props.subscriptions && (
                                            <Box py={2}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.updateSubscriptions}
                                                >
                                                    {this.props.subscriptions.includes(this.props.channel.channel_id)
                                                        ? "Unsubscribe"
                                                        : "Subscribe"}
                                                </Button>
                                            </Box>
                                        )}
                                    </React.Fragment>
                                )}
                                {!!this.props.post && (
                                    <React.Fragment>
                                        <Typography variant="h4" gutterBottom>
                                            Contact Information
                                        </Typography>
                                        <Typography variant="body1">{`Phone Number: ${
                                            this.props.post.phone_number
                                        }`}</Typography>
                                        <Typography variant="body1">{`Email: ${this.props.post.email}`}</Typography>
                                    </React.Fragment>
                                )}
                            </div>
                        </Box>
                    </Container>
                </React.Fragment>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts[0],
    channel: state.channels.channels[0],
    subscriptions: state.subscriptions.subscriptions
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id)),
    startGetChannel: (id) => dispatch(startGetChannel(id)),
    startGetSubscriptions: () => dispatch(startGetSubscriptions()),
    startUpdateSubscriptions: (id) => dispatch(startUpdateSubscriptions(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    restorePost: (id) => dispatch(restorePost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewPostPage);
