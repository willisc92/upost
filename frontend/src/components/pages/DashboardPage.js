import React from "react";
import { connect } from "react-redux";
import { getAllInterests } from "../../actions/interests";
import { startSetRandomPosts } from "../../actions/posts";

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interestsPosts: []
        };
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    componentDidMount() {
        this.props.getAllInterests().then(() => {
            for (let i = 0; i < this.props.interests.length; i++) {
                const interest_tag = this.props.interests[i].interest_tag;
                this.props.startSetRandomPosts(interest_tag).then((result) => {
                    if (result.length > 0) {
                        this.setState((prevState) => ({
                            interestsPosts: [...prevState.interestsPosts, { tag: interest_tag, posts: result }]
                        }));
                    }
                });
            }
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
        interests: state.userInterests.userInterests
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterests: () => dispatch(getAllInterests()),
        startSetRandomPosts: (interest) => dispatch(startSetRandomPosts(interest))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);
