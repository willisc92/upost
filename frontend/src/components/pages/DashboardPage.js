import React from "react";
import { connect } from "react-redux";
import { getAllInterests } from "../../actions/interests";
import { startSetInterestRandomPosts } from "../../actions/posts";
import MyPostSummary from "../MyPostSummary";

export class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.getAllInterests().then(() => {
            this.props.startSetInterestRandomPosts(this.props.interests);
        });
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        {!this.props.isAuthenticated ? (
                            <h1 className="page-header__title">You must login.</h1>
                        ) : (
                            <h1 className="page-header__title">{`Welcome, ${localStorage.getItem("first_name")}!`}</h1>
                        )}
                    </div>
                </div>
                <div className="content-container">
                    {this.props.interestRandomPosts.map((interestPosts) => {
                        return (
                            <div key={interestPosts.tag}>
                                <h1>{interestPosts.tag}</h1>
                                <div className="list-parent">
                                    {interestPosts.posts.map((post) => {
                                        return (
                                            <div key={post.post_id} className="list-box">
                                                <MyPostSummary post={post} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token,
        interests: state.userInterests.userInterests,
        interestRandomPosts: state.posts.interestRandomPosts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterests: () => dispatch(getAllInterests()),
        startSetInterestRandomPosts: (interests) => dispatch(startSetInterestRandomPosts(interests))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);
