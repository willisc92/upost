import React from "react";
import PostForm from "../forms/PostForm";
import EventForm from "../forms/EventForm";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";
import { addEvent } from "../../actions/events";
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

    onSubmit = async (data) => {
        switch (this.state.step) {
            case "Post": {
                await this.props
                    .addPost({ ...data })
                    .then((result) => {
                        if (this.state.finished) {
                            this.handleReturn();
                        } else {
                            this.setState(() => ({
                                step: "Event",
                                postID: result.data.post_id
                            }));
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
                break;
            }
            case "Event": {
                this.props
                    .addEvent({ ...data, post: this.state.postID })
                    .then(() => {
                        this.handleReturn();
                        // if (this.state.finished) {
                        //     this.handleReturn();
                        // } else {
                        //     this.setState(() => ({
                        //         step: "Event"
                        //     }));
                        // }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            }
            default: {
            }
        }
    };

    handleReturn = () => {
        const channel_id = this.props.match.params.id;
        this.props.history.push(`/myChannels/${channel_id}`);
    };

    onTriggerSaveReturn = async () => {
        await this.setState({ finished: true });
        this.submitButtonRef.click();
    };

    mapStepToTitle = () => {
        switch (this.state.step) {
            case "Post":
                return "Add a Post";
            case "Event":
                return "Add an Event";
            default:
                return "";
        }
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">{this.mapStepToTitle()}</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.state.step === "Post" && (
                        <PostForm
                            id="Post"
                            onSubmit={this.onSubmit}
                            channel={this.props.match.params.id}
                            nextStep="Save Post and Add Event"
                        />
                    )}
                    {this.state.step === "Event" && (
                        <EventForm
                            id="Event"
                            onSubmit={this.onSubmit}
                            channel={this.props.match.params.id}
                            nextStep="Save and Return"
                        />
                    )}
                    <button className="button" onClick={this.onTriggerSaveReturn}>
                        {`Save ${this.state.step} and Return to Channel`}
                    </button>
                    <button
                        className="button__invisible"
                        type="submit"
                        form={this.state.step}
                        ref={(node) => {
                            this.submitButtonRef = node;
                        }}
                    />
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
    addEvent: (event) => dispatch(addEvent(event)),
    startGetChannel: (channel_id) => dispatch(startGetChannel(channel_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostPage);
