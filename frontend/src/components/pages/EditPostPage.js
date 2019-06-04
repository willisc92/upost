import React from "react";
import { startGetPost, editPost } from "../../actions/posts";
import { connect } from "react-redux";
import PostForm from "../forms/PostForm";

class EditPostPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const post_id = this.props.match.params.id;
        this.props
            .startGetPost(post_id)
            .then((result) => {
                if (!!this.props.post) {
                    if (this.props.post.user !== localStorage.getItem("user_name")) {
                        this.props.history.push("/myChannels");
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onSubmit = (post) => {
        console.log(post);
        const post_id = this.props.match.params.id;
        console.log(post_id);
        this.props
            .editPost(post_id, post)
            .then((result) => {
                console.log(result);
                this.props.history.push(`/myChannels/${post.channel}`);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Post</h1>
                    </div>
                </div>
                <div className="content-container">
                    {!!this.props.post && (
                        <PostForm onSubmit={this.onSubmit} channel={this.props.post.channel} post={this.props.post} />
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
    startGetPost: (id) => dispatch(startGetPost(id)),
    editPost: (id, updates) => dispatch(editPost(id, updates))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostPage);
