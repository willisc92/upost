import React from "react";
import PostForm from "../forms/PostForm";
import EventForm from "../forms/EventForm";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";
import { addEvent } from "../../actions/events";
import { addIncentivePackage } from "../../actions/incentivePackage";
import { startGetChannel } from "../../actions/channels";

export class AddPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "Post",
            postID: null,
            finished: false,
            reoccuringEvents: null,
            reoccruingIncentive: null
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
                    .addPost(data)
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
                    .addEvent(data)
                    .then((result) => {
                        if (this.state.finished) {
                            this.handleReturn();
                        } else {
                            this.setState(() => ({
                                step: "Incentive"
                            }));
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
                break;
            }
            case "Incentive": {
                this.props
                    .addIncentivePackage(data)
                    .then((result) => {
                        console.log(JSON.stringify(result, null, 2));
                        this.handleReturn();
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
                break;
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
            case "Incentive":
                return "Add an Incentive";
            default:
                return "";
        }
    };

    skipEvent = () => {
        this.setState(() => ({
            step: "Incentive"
        }));
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
                            nextStep="Save Post and Add Event/Incentive"
                        />
                    )}
                    {this.state.step === "Event" && (
                        <div>
                            <EventForm
                                id="Event"
                                post={this.state.postID}
                                onSubmit={this.onSubmit}
                                channel={this.props.match.params.id}
                                nextStep="Save and Add Incentive"
                            />
                            <button className="button" onClick={this.skipEvent}>
                                Skip and Add Incentive
                            </button>
                        </div>
                    )}
                    {this.state.step === "Incentive" && (
                        <IncentiveForm
                            id="Incentive"
                            post={this.state.postID}
                            onSubmit={this.onSubmit}
                            nextStep="Save Incentive and Return to Channel"
                        />
                    )}
                    {this.state.step !== "Incentive" && (
                        <button className="button" onClick={this.onTriggerSaveReturn}>
                            {`Save ${this.state.step} and Return to Channel`}
                        </button>
                    )}
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
    addIncentivePackage: (incentive) => dispatch(addIncentivePackage(incentive)),
    startGetChannel: (channel_id) => dispatch(startGetChannel(channel_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostPage);
