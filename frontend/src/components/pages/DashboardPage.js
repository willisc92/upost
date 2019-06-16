import React from "react";
import { connect } from "react-redux";
import { getAllInterests } from "../../actions/interests";
import { startSetInterestRandomPosts } from "../../actions/posts";

export class DashboardPage extends React.Component {
    componentDidUpdate() {
        console.log(this.props.interestRandomPosts);
    }

    componentDidMount() {
        this.props.getAllInterests().then(() => {
            this.props.startSetInterestRandomPosts(this.props.interests);
        });
    }

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {!this.props.isAuthenticated ? (
                        <h1 className="page-header__title">You must login.</h1>
                    ) : (
                        <h1 className="page-header__title">{`Welcome, ${localStorage.getItem("first_name")}!`}</h1>
                    )}
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
