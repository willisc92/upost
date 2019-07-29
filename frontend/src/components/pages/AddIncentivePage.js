import React from "react";
import { addIncentivePackage } from "../../actions/incentivePackage";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class AddIncentivePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetPost(post_id)
                    .then((post_res) => {
                        if (res.data.username !== post_res.data[0].user) {
                            this.props.history.push(`/myChannels`);
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
        this.props
            .addIncentivePackage(incentive)
            .then((res) => this.props.history.push(`/myChannels/${this.props.post.channel}`))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    goBack = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/edit`);
    };

    goToIncentive = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/editIncentive`);
    };

    render() {
        const read_only = !!this.props.post && this.props.post.deleted_flag;
        const existing_incentive = !!this.props.post && !!this.props.post.post_incentive;

        return (
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        <Box paddingBottom={2}>
                            <Typography variant="h1" display="inline" gutterBottom>
                                Add an Incentive Package to Post:{" "}
                            </Typography>
                            <Typography variant="h1" display="inline" color="primary" gutterBottom>
                                {this.props.post && this.props.post.post_title}
                            </Typography>
                        </Box>
                        {existing_incentive && (
                            <Box paddingBottom={2}>
                                <Typography variant="h2" color="error" gutterBottom>
                                    This post already has an existing incentive
                                </Typography>
                                <Button variant="contained" color="primary" onClick={this.goToIncentive}>
                                    Go to Incentive
                                </Button>
                            </Box>
                        )}
                        {read_only && (
                            <Box>
                                <Typography variant="h2" color="error" gutterBottom>
                                    The post that this incentive will be tied to is deleted and must be restored first.
                                </Typography>
                                <Button variant="contained" color="primary" onClick={this.goBack}>
                                    Go to Post
                                </Button>
                            </Box>
                        )}
                    </Container>
                </Box>
                <Container fixed>
                    <IncentiveForm
                        onSubmit={this.onSubmit}
                        post={this.props.match.params.id}
                        nextStep={"Save"}
                        read_only={read_only || existing_incentive}
                    />
                    {!read_only && (
                        <Button variant="contained" color="primary" onClick={this.goBack}>
                            Go Back
                        </Button>
                    )}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts[0]
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    addIncentivePackage: (incentive) => dispatch(addIncentivePackage(incentive)),
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddIncentivePage);
