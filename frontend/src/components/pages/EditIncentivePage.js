import React from "react";
import { editIncentivePackage } from "../../actions/incentivePackage";
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
                            this.props.history.push(`/myPosts/${post_id}/incentives`);
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
        const incentive_id = this.props.match.params.incentive_id;

        this.props
            .editIncentivePackage(incentive_id, incentive)
            .then((res) => this.props.history.push(`/myPosts/${post_id}/incentives`))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    goBack = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/events`);
    };

    render() {
        const { incentive } = this.props.location.state;
        const read_only = new Date(incentive.planned_start_date) < new Date() ? true : false;

        return (
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
                    {read_only && <p className="form__error">Cannot Edit a Past/Ongoing Incentive</p>}
                    <IncentiveForm
                        onSubmit={this.onSubmit}
                        post={this.props.match.params.id}
                        incentivePackage={incentive}
                        read_only={read_only}
                    />
                    <button className="button" onClick={this.goBack}>
                        {" "}
                        Go Back{" "}
                    </button>
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
    editIncentivePackage: (id, incentive) => dispatch(editIncentivePackage(id, incentive)),
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddIncentivePage);
