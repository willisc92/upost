import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../actions/subscriptions";
import IncentivePackage from "../IncentivePackage";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { getCurrentUser } from "../../actions/auth";

class ViewPostPage extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isOwner: false
        };
    }

    componentDidMount() {
        this._isMounted = true;

        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        this.props
            .startGetPost(post_id)
            .then((res) => {
                if (res.data[0].deleted_flag) {
                    this.props.history.push("/");
                }
                this.props.startGetChannel(this.props.post.channel).catch((err) => {
                    console.log("error in getting channel information", JSON.stringify(err, null, 2));
                });

                getCurrentUser()
                    .then((user_res) => {
                        if (this._isMounted) {
                            this.setState(() => ({
                                isOwner: user_res.data.username === res.data[0].user
                            }));
                        }
                    })
                    .catch((err) => console.log(err));
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

    render() {
        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        <Typography variant="h1">Post</Typography>
                    </Container>
                </Box>
                <Container fixed>
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
                                    <Typography variant="h2" color="primary">
                                        {this.props.post.post_title}
                                    </Typography>
                                    <Box>
                                        {this.state.isOwner && (
                                            <Button variant="contained" color="primary" onClick={this.editPost}>
                                                Edit Post
                                            </Button>
                                        )}{" "}
                                        {this.props.post.post_events.length > 0 && (
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
                                <Typography variant="body1" gutterBottom>
                                    Description: {this.props.post.post_description}
                                </Typography>
                                {!!this.props.post.post_incentive && (
                                    <IncentivePackage package={this.props.post.post_incentive} />
                                )}
                            </div>
                        )}
                        <div className="content-container-onethirds">
                            {!!this.props.channel && (
                                <div>
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
                                </div>
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
    startUpdateSubscriptions: (id) => dispatch(startUpdateSubscriptions(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewPostPage);
