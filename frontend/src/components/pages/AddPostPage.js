import React from "react";
import PostForm from "../forms/PostForm";
import EventForm from "../forms/EventForm";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";

export class AddPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "Post",
            postID: null,
            finished: false
        };
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

    onSubmit = (data) => {
        switch (this.state.step) {
            case "Post": {
                this.props
                    .addPost({ ...data })
                    .then(() => {
                        this.setState(() => ({
                            step: "Event"
                        }));
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            }
            case "Event": {
            }
            default: {
            }
        }
    };

    handleReturn = () => {
        const channel_id = this.props.match.params.id;
        this.props.history.push(`/myChannels/${channel_id}`);
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
                    {this.state.step === "Post" && (
                        <PostForm
                            onSubmit={this.onSubmit}
                            channel={this.props.match.params.id}
                            nextStep="Save, and add an optional event"
                        />
                    )}
                    {this.state.step === "Event" && (
                        <EventForm onSubmit={this.onSubmit} channel={this.props.match.params.id} nextStep="Save" />
                    )}
                    <button className="button" onClick={this.handleReturn}>
                        Return to channel
                    </button>
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
