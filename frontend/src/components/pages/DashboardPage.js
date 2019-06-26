import React from "react";
import { connect } from "react-redux";
import { getAllInterests, startSetUserInterests } from "../../actions/interests";
import { startSetInterestRandomPosts } from "../../actions/posts";
import MyPostSummary from "../MyPostSummary";

export class DashboardPage extends React.Component {
    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.startSetUserInterests().then(() => {
                this.props.startSetInterestRandomPosts(this.props.interests);
            });
        } else {
            this.props.getAllInterests().then(() => {
                this.props.startSetInterestRandomPosts(this.props.interests);
            });
        }
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
<<<<<<< HEAD
                                {/* <div className="list-parent"> */}
                                {interestPosts.posts.map((post) => {
                                    return (
                                        // <div key={post.post_id} className="list-box">
                                        <MyPostSummary post={post} pathName={`/post/${post.post_id}`} />
                                        // </div>
=======
                                {interestPosts.posts.map((post) => {
                                    return (
                                        <MyPostSummary
                                            key={post.post_id}
                                            post={post}
                                            pathName={`/post/${post.post_id}`}
                                        />
>>>>>>> react-pages
                                    );
                                })}
                            </div>
                            // </div>
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
        startSetInterestRandomPosts: (interests) => dispatch(startSetInterestRandomPosts(interests)),
        startSetUserInterests: () => dispatch(startSetUserInterests())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);
