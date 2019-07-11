import React from "react";
import { addIncentivePackage } from "../../actions/incentivePackage";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";

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
        const post_id = this.props.match.params.id;

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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Add an Incentive Package to Post:{" "}
                            <span>{this.props.post && this.props.post.post_title}</span>
                        </h1>
                        {existing_incentive && (
                            <div>
                                <h2>This post already has an existing incentive</h2>
                                <button className="button" onClick={this.goToIncentive}>
                                    Go to Incentive
                                </button>
                            </div>
                        )}
                        {read_only && (
                            <div>
                                <h2 className="page-header__subtitle__red">
                                    The post that this incentive will be tied to is deleted and must be restored first.
                                </h2>
                                <button className="button" onClick={this.goBack}>
                                    Go to Post
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="content-container">
                    <IncentiveForm
                        onSubmit={this.onSubmit}
                        post={this.props.match.params.id}
                        nextStep={"Save"}
                        read_only={read_only || existing_incentive}
                    />
                    {!read_only && (
                        <button className="button" onClick={this.goBack}>
                            Go Back
                        </button>
                    )}
                </div>
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
