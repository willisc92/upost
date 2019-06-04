import React from "react";
import { startGetPost } from "../../actions/posts";
import { connect } from "react-redux";
import { PostForm } from "../forms/PostForm";

class EditPostPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const post_id = this.props.match.params.id;
        console.log(post_id, channel_id);
        this.props.startGetPost(post_id);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.length === 1 && newProps.loading === false) {
            if (newProps.post.user !== localStorage.getItem("user_name")) {
                this.props.history.push("/myChannels");
            }
        }
    }

    onSubmit = (post) => {
        console.log(post);
        // const channel_id = this.props.match.params.id;
        // this.props
        //     .addPost({ ...post })
        //     .then(() => this.props.history.push(`/myChannels/${channel_id}`))
        //     .catch((err) => {
        //         console.log(err);
        //     });
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
                    <PostForm onSubmit={this.onSubmit} channel={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.posts.loading,
    post: state.posts.posts[0],
    error: state.posts.error
});

const mapDispatchToProps = (dispatch) => ({
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostPage);
