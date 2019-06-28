import React from "react";
import { connect } from "react-redux";
import { getAllInterests, startSetUserInterests, clearInterests } from "../../actions/interests";
import { startSetInterestRandomPosts } from "../../actions/posts";
import { BrowsePostMenu } from "../MyPostSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
    }

    componentDidMount() {
        this.props.clearInterests();
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

    componentWillReceiveProps(newProps) {
        if (newProps.isAuthenticated !== this.props.isAuthenticated) {
            this.props.clearInterests();
            if (newProps.isAuthenticated) {
                this.props.startSetUserInterests().then(() => {
                    this.props.startSetInterestRandomPosts(this.props.interests);
                });
            } else {
                this.props.getAllInterests().then(() => {
                    this.props.startSetInterestRandomPosts(this.props.interests);
                });
            }
        }
    }

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    render() {
        const menus = [];
        this.props.interestRandomPosts.forEach((element, i) => {
            menus.push(BrowsePostMenu(element.posts, this.state.selected));
        });

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
                    {this.props.interestRandomPosts.map((interestPosts, index) => {
                        return (
                            <div key={interestPosts.tag}>
                                <h1>{interestPosts.tag}</h1>
                                <ScrollMenu
                                    data={menus[index]}
                                    arrowLeft={ArrowLeft}
                                    arrowRight={ArrowRight}
                                    selected={this.state.selected}
                                    onSelect={this.onSelect}
                                />
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
        clearInterests: () => dispatch(clearInterests()),
        getAllInterests: () => dispatch(getAllInterests()),
        startSetInterestRandomPosts: (interests) => dispatch(startSetInterestRandomPosts(interests)),
        startSetUserInterests: () => dispatch(startSetUserInterests())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);
