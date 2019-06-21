import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";

class ViewPostPage extends React.Component {
    componentDidMount() {
        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        this.props
            .startGetPost(post_id)
            .then((result) => {
                console.log("post", this.props.post);
                this.props.startGetChannel(this.props.post.channel).then(() => {
                    console.log("channel", this.props.channel);
                });
            })
            .catch((err) => {
                console.log("error", JSON.stringify(err, null, 2));
            });
    }

    render() {
        return (
            <div>
                {!!this.props.post && (
                    <div>
                        <img src={this.props.post.picture} />
                        <h1>{this.props.post.post_title}</h1>
                        <p>{this.props.post.post_description}</p>
                        <p>{`Cost: ${this.props.post.cost}`}</p>
                    </div>
                )}
                {!!this.props.channel && (
                    <div>
                        <h1>{this.props.channel.channel_name}</h1>
                        <button>Subscribe</button>
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
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts[0],
    channel: state.channels.channels[0]
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id)),
    startGetChannel: (id) => dispatch(startGetChannel(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewPostPage);
