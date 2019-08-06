import React from "react";
import {
    startGetIncentivePackage,
    clearIncentivePackage,
    editIncentivePackage,
    deleteIncentivePackage,
    restoreIncentivePackage
} from "../../actions/incentivePackage";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CustomStepper from "../CustomStepper";

class EditIncentivePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: [],
            activeStep: undefined
        };
    }

    componentWillMount() {
        this.props.clearPosts();
        this.props.clearIncentivePackage();
        const post_id = this.props.match.params.id;

        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetPost(post_id)
                    .then((post_res) => {
                        if (res.data.username !== post_res.data[0].user || !post_res.data[0].post_incentive) {
                            this.props.history.push("/");
                        } else {
                            this.props.startGetIncentivePackage(post_res.data[0].post_incentive.incentive_package_id);

                            this.setState(() => ({
                                steps: [
                                    { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                    {
                                        label: `Bulletin Board`,
                                        onClick: this.goToChannel
                                    },
                                    { label: `Post: ${this.props.post.post_title}`, onClick: this.moveToPost },
                                    { label: "Edit Post", onClick: this.goBack },
                                    { label: "Edit Incentive", onClick: null }
                                ],
                                activeStep: 4
                            }));
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

    onSubmit = (incentive) => {
        const post_id = this.props.match.params.id;
        const incentive_id = this.props.incentive.incentive_package_id;

        this.props
            .editIncentivePackage(incentive_id, incentive)
            .then((res) => this.props.history.push(`/myPosts/${post_id}/edit`))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    goBack = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/edit`);
    };

    restoreIncentive = () => {
        const incentive_id = this.props.incentive.incentive_package_id;
        this.props
            .restoreIncentivePackage(incentive_id)
            .then(() => {
                this.props
                    .startGetIncentivePackage(incentive_id)
                    .then(() => {})
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    deleteIncentive = () => {
        const incentive_id = this.props.incentive.incentive_package_id;
        this.props
            .deleteIncentivePackage(incentive_id)
            .then(() => {
                this.props
                    .startGetIncentivePackage(incentive_id)
                    .then(() => {})
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    moveToPost = () => {
        this.props.history.push(`/post/${this.props.match.params.id}`);
    };

    goToChannel = () => {
        const channel = this.props.post.channel;
        this.props.history.push(`/channels/${channel}`);
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    render() {
        const post_read_only = !!this.props.post && this.props.post.deleted_flag;
        const incentive_read_only = !!this.props.incentive && this.props.incentive.deleted_flag;

        return (
            !!this.props.incentive &&
            !!this.props.post && (
                <Box>
                    <Box bgcolor="secondary.main" py={3}>
                        <Container maxWidth="xl">
                            <Typography variant="h1" gutterBottom>
                                Edit Incentive Package for Post:{" "}
                                <Typography variant="inherit" display="inline" color="primary">
                                    {this.props.post && this.props.post.post_title}
                                </Typography>
                            </Typography>
                            <Box paddingBottom={2}>
                                {post_read_only ? (
                                    <Typography variant="h2" color="error" gutterBottom>
                                        You must restore the post linked to this incentive before editing.
                                    </Typography>
                                ) : incentive_read_only ? (
                                    <React.Fragment>
                                        <Typography variant="h2" color="error" gutterBottom>
                                            You must restore this incentive before editing.
                                        </Typography>
                                        <Button variant="contained" color="primary" onClick={this.restoreIncentive}>
                                            Restore
                                        </Button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <CustomStepper steps={this.state.steps} activeStep={this.state.activeStep} />
                                        <Button variant="contained" color="primary" onClick={this.deleteIncentive}>
                                            Delete Incentive
                                        </Button>
                                    </React.Fragment>
                                )}
                            </Box>
                            <Button variant="contained" color="primary" onClick={this.goBack}>
                                Go To Post
                            </Button>
                        </Container>
                    </Box>
                    <Container maxWidth="xl">
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            post={this.props.match.params.id}
                            incentivePackage={this.props.incentive}
                            read_only={post_read_only || incentive_read_only}
                            nextStep="Save"
                            fromPost={true}
                        />
                    </Container>
                </Box>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts[0],
    incentive: state.incentivePackage.incentivePackage.length !== 0 ? state.incentivePackage.incentivePackage : null
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    clearIncentivePackage: () => dispatch(clearIncentivePackage()),
    editIncentivePackage: (id, incentive) => dispatch(editIncentivePackage(id, incentive)),
    startGetIncentivePackage: (id) => dispatch(startGetIncentivePackage(id)),
    startGetPost: (id) => dispatch(startGetPost(id)),
    deleteIncentivePackage: (id) => dispatch(deleteIncentivePackage(id)),
    restoreIncentivePackage: (id) => dispatch(restoreIncentivePackage(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditIncentivePage);
