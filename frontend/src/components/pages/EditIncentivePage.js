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

class EditIncentivePage extends React.Component {
    constructor(props) {
        super(props);
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
                            this.props.history.push(`/myPosts/${post_id}/incentives`);
                        } else {
                            this.props.startGetIncentivePackage(post_res.data[0].post_incentive.incentive_package_id);
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

    render() {
        const post_read_only = !!this.props.post && this.props.post.deleted_flag;
        const incentive_read_only = !!this.props.incentive && this.props.incentive.deleted_flag;

        return (
            !!this.props.incentive &&
            !!this.props.post && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Edit Incentive Package for Post:{" "}
                                <span>{this.props.post && this.props.post.post_title}</span>
                            </h1>
                            {post_read_only ? (
                                <div>
                                    <h2 className="page-header__subtitle__red">
                                        You must restore the post linked to this incentive before editing.
                                    </h2>
                                    <button className="button" onClick={this.goBack}>
                                        Go To Post
                                    </button>
                                </div>
                            ) : incentive_read_only ? (
                                <div>
                                    <h2 className="page-header__subtitle__red">
                                        You must restore this incentive before editing.
                                    </h2>
                                    <button className="button" onClick={this.restoreIncentive}>
                                        Restore
                                    </button>{" "}
                                    <button className="button" onClick={this.goBack}>
                                        Go To Post
                                    </button>
                                </div>
                            ) : (
                                <button className="button" onClick={this.deleteIncentive}>
                                    Delete Incentive
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="content-container">
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            post={this.props.match.params.id}
                            incentivePackage={this.props.incentive}
                            read_only={post_read_only || incentive_read_only}
                            nextStep="Save"
                        />
                        {!post_read_only && !incentive_read_only && (
                            <button className="button" onClick={this.goBack}>
                                {" "}
                                Go Back{" "}
                            </button>
                        )}
                    </div>
                </div>
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
