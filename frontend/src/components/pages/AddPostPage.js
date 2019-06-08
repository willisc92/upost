import React from "react";
import PostForm from "../forms/PostForm";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";

class AddPostPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const channel_id = this.props.match.params.id;
        this.props
            .startGetChannel(channel_id)
            .then(() => {
                if (!!this.props.post) {
                    if (this.props.channel.user !== localStorage.getItem("user_name")) {
                        this.props.history.push("/");
                    }
                }
            })
            .catch((err) => console.log(err));
    }

    onSubmit = (post) => {
        const channel_id = this.props.match.params.id;

        this.props
            .addPost({ ...post })
            .then(() => this.props.history.push(`/myChannels/${channel_id}`))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
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

const mapStateToProps = (state) => ({
    channel: state.channels.channels[0]
});

const mapDispatchToProps = (dispatch) => ({
    addPost: (post) => dispatch(addPost(post)),
    startGetChannel: (channel_id) => dispatch(startGetChannel(channel_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostPage);
