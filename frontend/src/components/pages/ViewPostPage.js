import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../actions/subscriptions";
import IncentivePackage from "../IncentivePackage";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class ViewPostPage extends React.Component {
    componentDidMount() {
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
            })
            .catch((err) => {
                console.log("error in getting post information", JSON.stringify(err, null, 2));
            });

        // check to see if subscriptions is provided
        if (!this.props.subscriptions) {
            this.props.startGetSubscriptions();
        }
    }

    updateSubscriptions = () => {
        this.props.startUpdateSubscriptions(this.props.channel.channel_id);
    };

    moveToPostEventsPage = () => {
        this.props.history.push(`/post-events/${this.props.post.post_id}`);
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <Typography variant="h1">Post</Typography>
                    </div>
                </div>
                <div className="content-container-split">
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
                            <div className="post__title">
                                <Typography variant="h2">{this.props.post.post_title}</Typography>
                                {this.props.post.post_events.length > 0 && (
                                    <Button variant="contained" color="primary" onClick={this.moveToPostEventsPage}>
                                        See Events
                                    </Button>
                                )}
                            </div>
                            <Typography variant="body1">Description: {this.props.post.post_description}</Typography>
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
                                    <Typography variant="h3">{this.props.channel.channel_name}</Typography>
                                </Link>
                                {!!this.props.subscriptions && (
                                    <Button variant="contained" color="primary" onClick={this.updateSubscriptions}>
                                        {this.props.subscriptions.includes(this.props.channel.channel_id)
                                            ? "Unsubscribe"
                                            : "Subscribe"}
                                    </Button>
                                )}
                            </div>
                        )}
                        {!!this.props.post && (
                            <div>
                                <Typography variant="h3">Contact Information</Typography>
                                <Typography variant="body1">{`Phone Number: ${
                                    this.props.post.phone_number
                                }`}</Typography>
                                <Typography variant="body1">{`Email: ${this.props.post.email}`}</Typography>
                            </div>
                        )}
                    </div>
                </div>
            </div>
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
