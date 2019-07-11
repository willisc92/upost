import React from "react";
import PostForm from "../forms/PostForm";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import { getCurrentUser } from "../../actions/auth";

export class AddPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "Post",
            error: ""
        };
    }

    componentDidMount() {
        const channel_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetChannel(channel_id)
                    .then((channel_res) => {
                        if (res.data.username !== channel_res.data[0].user) {
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

    onSubmit = (data) => {
        this.props
            .addPost(data)
            .then((result) => {
                if (this.state.step === "Post") {
                    this.handleReturn();
                } else if (this.state.step === "Event") {
                    this.props.history.push(`/myPosts/${result.data.post_id}/addEvent`);
                } else if (this.state.step === "Incentive") {
                    this.props.history.push(`/myPosts/${result.data.post_id}/addIncentive`);
                }
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    handleReturn = () => {
        const channel_id = this.props.match.params.id;
        this.props.history.push(`/myChannels/${channel_id}`);
    };

    onTriggerSaveAddEvent = async () => {
        await this.setState(() => ({ step: "Event" }));
        this.submitButtonRef.click();
    };

    onTriggerSaveAddIncentive = async () => {
        await this.setState(() => ({ step: "Incentive" }));
        this.submitButtonRef.click();
    };

    render() {
        const read_only = !!this.props.channel && this.props.channel.deleted_flag;

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Add Post to Channel: <span>{this.props.channel && this.props.channel.channel_name}</span>
                        </h1>
                        {read_only ? (
                            <div>
                                <h2 className="page-header__subtitle__red">
                                    You must restore the Channel of this post before adding.
                                </h2>
                                <button className="button" onClick={this.handleReturn}>
                                    Go to Channel
                                </button>
                            </div>
                        ) : (
                            <button className="button" onClick={this.handleReturn}>
                                Go Back
                            </button>
                        )}
                    </div>
                </div>
                <div className="content-container">
                    {!!this.state.error && <p className="form__error">{this.state.error}</p>}
                    <PostForm
                        id="Post"
                        onSubmit={this.onSubmit}
                        channel={this.props.match.params.id}
                        nextStep="Save Post and Return"
                        read_only={read_only}
                    />
                    {!read_only && (
                        <div className="input-group">
                            <div className="input-group__item">
                                <button className="button" onClick={this.onTriggerSaveAddEvent}>
                                    Save Post and Add Event
                                </button>
                            </div>
                            <div className="input-group__item">
                                <button className="button" onClick={this.onTriggerSaveAddIncentive}>
                                    Save Post and Add Incentive
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        className="button__invisible"
                        type="submit"
                        form="Post"
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
    startGetChannel: (channel_id) => dispatch(startGetChannel(channel_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostPage);
