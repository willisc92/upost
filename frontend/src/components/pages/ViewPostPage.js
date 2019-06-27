import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../actions/subscriptions";

class ViewPostPage extends React.Component {
    componentDidMount() {
        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        this.props
            .startGetPost(post_id)
            .then(() => {
                this.props.startGetChannel(this.props.post.channel).catch((err) => {
                    console.log("error in getting channel information", JSON.stringify(err, null, 2));
                });
            })
            .catch((err) => {
                console.log("error in getting post information", JSON.stringify(err, null, 2));
            });
        this.props.startGetSubscriptions();
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
                        <h1 className="page-header__title">Post</h1>
                    </div>
                </div>
                <div className="content-container-split">
                    {!!this.props.post && (
                        <div className="content-container-twothirds">
                            <img className="post-image" src={this.props.post.picture} />
                            {this.props.post.post_events.length > 0 && (
                                <button className="button" onClick={this.moveToPostEventsPage}>
                                    See Events
                                </button>
                            )}
                            <h1>{this.props.post.post_title}</h1>
                            <p>Description: {this.props.post.post_description}</p>
                        </div>
                    )}
                    <div className="content-container-onethirds">
                        {!!this.props.channel && (
                            <div>
                                <h1>{this.props.channel.channel_name}</h1>
                                {!!this.props.subscriptions && (
                                    <button className="button" onClick={this.updateSubscriptions}>
                                        {this.props.subscriptions.includes(this.props.channel.channel_id)
                                            ? "Unsubscribe"
                                            : "Subscribe"}
                                    </button>
                                )}
                            </div>
                        )}
                        {!!this.props.post && (
                            <div>
                                <h1>Contact Information</h1>
                                <p>{`Phone Number: ${this.props.post.phone_number}`}</p>
                                <p>{`Email: ${this.props.post.email}`}</p>
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