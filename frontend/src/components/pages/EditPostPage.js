import React from "react";
import { startGetPost, editPost, clearPosts } from "../../actions/posts";
import { connect } from "react-redux";
import PostForm from "../forms/PostForm";
import { getCurrentUser } from "../../actions/auth";

export class EditPostPage extends React.Component {
    constructor(props) {
        super(props);
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
                    this.props.history.push(`/myChannels/${post.get("channel")}`);
                } else {
                    this.props.history.push(`/myChannels/${post.channel}`);
                }
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    onEditIncentiveClick = () => {
        console.log("Link to edit incentive");
    };

    onEditEventsClick = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/events`);
    };

    // Add link to post-events
    // Add link to post-incentives
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Post</h1>
                        <button className="button" onClick={this.onEditEventsClick}>
                            Add/Edit Events
                        </button>{" "}
                        <button className="button">Add/Edit Incentives</button>
                    </div>
                </div>
                <div className="content-container">
                    {!!this.props.post && (
                        <PostForm
                            onSubmit={this.onSubmit}
                            channel={this.props.post.channel}
                            post={this.props.post}
                            nextStep="Save Changes"
                        />
                    )}
                </div>
            </div>
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
    editPost: (id, updates) => dispatch(editPost(id, updates))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostPage);
