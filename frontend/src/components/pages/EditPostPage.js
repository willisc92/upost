import React from "react";
import { startGetPost, editPost, clearPosts, deletePost, restorePost } from "../../actions/posts";
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
        this.props.history.push(`/myPosts/${this.props.match.params.id}/editIncentive`);
    };

    onAddIncentiveClick = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/addIncentive`);
    };

    onEditEventsClick = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/events`);
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
        this.props.history.push(`/myChannels/${channel}`);
    };

    render() {
        const read_only_channel = !!this.props.post && this.props.post.channel_deleted_flag;
        const read_only_post = !!this.props.post && this.props.post.deleted_flag;

        return (
            !!this.props.post && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Edit Post for <span>{this.props.post && this.props.post.post_title}</span>
                            </h1>
                            {read_only_channel ? (
                                <div>
                                    <h2 className="page-header__subtitle__red">
                                        You must restore the Channel of this post before editing.
                                    </h2>
                                    <button className="button" onClick={this.goToChannel}>
                                        Go to Channel
                                    </button>
                                </div>
                            ) : read_only_post ? (
                                <div>
                                    <h2 className="page-header__subtitle__red">
                                        You must restore this post before editing.
                                    </h2>
                                    <button className="button" onClick={this.restorePost}>
                                        Restore Post
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button className="button" onClick={this.onEditEventsClick}>
                                        Add/Edit Events
                                    </button>{" "}
                                    {!!this.props.post.post_incentive ? (
                                        <button className="button" onClick={this.onEditIncentiveClick}>
                                            Edit Post Incentive
                                        </button>
                                    ) : (
                                        <button className="button" onClick={this.onAddIncentiveClick}>
                                            Add Incentive to Post
                                        </button>
                                    )}{" "}
                                    <button className="button" onClick={this.deletePost}>
                                        Delete Post
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="content-container">
                        {!!this.props.post && (
                            <PostForm
                                onSubmit={this.onSubmit}
                                channel={this.props.post.channel}
                                post={this.props.post}
                                nextStep="Save Changes"
                                read_only={read_only_channel || read_only_post}
                            />
                        )}
                    </div>
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
