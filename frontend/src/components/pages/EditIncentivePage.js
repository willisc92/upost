import React from "react";
import { startGetIncentivePackage, clearIncentivePackage, editIncentivePackage } from "../../actions/incentivePackage";
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

    render() {
        return (
            !!this.props.incentive && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Edit Incentive Package for Post:{" "}
                                <span>{this.props.post && this.props.post.post_title}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="content-container">
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            post={this.props.match.params.id}
                            incentivePackage={this.props.incentive}
                            read_only={false}
                            nextStep="Save"
                        />
                        <button className="button" onClick={this.goBack}>
                            {" "}
                            Go Back{" "}
                        </button>
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
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditIncentivePage);
