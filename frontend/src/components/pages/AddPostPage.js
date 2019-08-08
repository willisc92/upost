import React from "react";
import PostForm from "../forms/PostForm";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import { getCurrentUser } from "../../actions/auth";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CustomStepper from "../CustomStepper";

export class AddPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "Post",
            error: "",
            steps: [],
            activeStep: undefined
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
                        } else {
                            this.setState(() => {
                                return {
                                    steps: [
                                        { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                        {
                                            label: `Bulletin Board: ${this.props.channel.channel_name}`,
                                            onClick: this.handleReturn
                                        },
                                        { label: "Add Post", onClick: null },
                                        { label: "?", onClick: null }
                                    ],
                                    activeStep: 2
                                };
                            });
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
        this.props.history.push(`/channels/${channel_id}`);
    };

    onTriggerSaveAddEvent = async () => {
        await this.setState(() => ({ step: "Event" }));
        this.submitButtonRef.click();
    };

    onTriggerSaveAddIncentive = async () => {
        await this.setState(() => ({ step: "Incentive" }));
        this.submitButtonRef.click();
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    render() {
        const read_only = !!this.props.channel && this.props.channel.deleted_flag;

        return (
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h1" gutterBottom>
                                Add Post to:{" "}
                                <Typography variant="inherit" display="inline" color="primary">
                                    {this.props.channel && this.props.channel.channel_name}
                                </Typography>
                            </Typography>
                            {read_only ? (
                                <Box>
                                    <Typography variant="h2" color="error" gutterBottom>
                                        You must restore the Channel of this post before adding.
                                    </Typography>
                                    <Button color="primary" variant="contained" onClick={this.handleReturn}>
                                        Go to Channel
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    <CustomStepper steps={this.state.steps} activeStep={this.state.activeStep} />
                                    <Button color="primary" variant="contained" onClick={this.handleReturn}>
                                        Go Back
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    <Box py={3}>
                        {!!this.state.error && (
                            <Typography gutterBottom variant="h3" color="error">
                                {this.state.error}
                            </Typography>
                        )}
                        <PostForm
                            id="Post"
                            onSubmit={this.onSubmit}
                            channel={this.props.match.params.id}
                            nextStep="Save Post and Return"
                            read_only={read_only}
                        />
                        {!read_only && (
                            <Box display="flex" flexDirection="column">
                                <Box paddingBottom={2}>
                                    <Button color="primary" variant="contained" onClick={this.onTriggerSaveAddEvent}>
                                        Save Post and Add Event
                                    </Button>
                                </Box>
                                <Box>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={this.onTriggerSaveAddIncentive}
                                    >
                                        Save Post and Add Perk
                                    </Button>
                                </Box>
                            </Box>
                        )}
                        <button
                            className="button__invisible"
                            type="submit"
                            form="Post"
                            ref={(node) => {
                                this.submitButtonRef = node;
                            }}
                        />
                    </Box>
                </Container>
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
