import React from "react";
import PostForm from "../forms/PostForm";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";

class AddPostPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (post) => {
        const channel_id = this.props.match.params.id;

        this.props
            .addPost({ ...post })
            .then(() => this.props.history.push(`/myChannels/${channel_id}`))
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add a Post</h1>
                    </div>
                </div>
                <div className="content-container">
                    <PostForm onSubmit={this.onSubmit} channel={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addPost: (post) => dispatch(addPost(post))
});

export default connect(
    null,
    mapDispatchToProps
)(AddPostPage);
