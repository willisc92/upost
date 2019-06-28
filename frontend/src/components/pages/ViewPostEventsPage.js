import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";

class ViewPostEventsPage extends React.Component {
    componentDidUpdate() {
        console.log(this.props);
    }

    componentDidMount() {
        const post_id = parseInt(this.props.match.params.id);

        // check to see if current post in store matches given id
        if (!!this.props.post && this.props.post.post_id === post_id) {
            // pass
        } else {
            // load post from API
            this.props.clearPosts();
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
        }
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        {!!this.props.post && (
                            <h1 className="page-header__title">{this.props.post.post_title} - Events</h1>
                        )}
                    </div>
                </div>
                <div className="content-container">
                    {!!this.props.post &&
                        this.props.post.post_events.map((event) => {
                            return <p key={event.event_id}>{event.event_id}</p>;
                        })}
                </div>
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
)(ViewPostEventsPage);
