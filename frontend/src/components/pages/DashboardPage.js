import React from "react";
import { connect } from "react-redux";
import { getAllInterests, startSetUserInterests } from "../../actions/interests";
import { startSetInterestRandomPosts, getNonInterestPosts } from "../../actions/posts";
import { BrowsePostMenu } from "../MyPostSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";
import { Link } from "react-router-dom";
import SignupModal from "../modals/SignupModal";
import LoginModal from "../modals/LoginModal";

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            loginOpen: false,
            signupOpen: false,
            error: undefined
        };
    }

    handleLoginModalOpen = () => {
        this.setState(() => {
            return { loginOpen: true };
        });
    };

    handleLoginModalClose = () => {
        this.setState(() => {
            return { loginOpen: false };
        });
    };

    handleSignupModalClose = () => {
        this.setState(() => {
            return { signupOpen: false };
        });
    };

    handleSignupModalOpen = () => {
        this.setState(() => {
            return { signupOpen: true };
        });
    };

    closeLoginOpenSignupModal = () => {
        this.handleLoginModalClose();
        this.handleSignupModalOpen();
    };

    closeSignupOpenLoginModal = () => {
        this.handleSignupModalClose();
        this.handleLoginModalOpen();
    };

    handleSucessfulLogin = () => {
        this.handleLoginModalClose();
        this.props.history.push("/");
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.startSetUserInterests().then(() => {
                this.props.startSetInterestRandomPosts(this.props.userInterests);
            });

            this.props
                .getNonInterestPosts()
                .then(() => {})
                .catch((err) => console.log(JSON.stringify(err, null, 2)));
        } else {
            if (this.props.interests.length === 0) {
                this.props.getAllInterests().then(() => {
                    this.props.startSetInterestRandomPosts(this.props.interests);
                });
            } else {
                this.props.startSetInterestRandomPosts(this.props.interests);
            }
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isAuthenticated !== this.props.isAuthenticated) {
            if (newProps.isAuthenticated) {
                this.props.startSetUserInterests().then(() => {
                    this.props.startSetInterestRandomPosts(this.props.userInterests);
                });
            } else if (this.props.interests.length === 0) {
                this.props.getAllInterests().then(() => {
                    this.props.startSetInterestRandomPosts(this.props.interests);
                });
            } else {
                this.props.startSetInterestRandomPosts(this.props.interests);
            }
        }
    }

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    goToInterests = () => {
        this.props.history.push(`/interests`);
    };

    render() {
        const menus = [];
        this.props.interestRandomPosts.forEach((element, i) => {
            menus.push(BrowsePostMenu(element.posts, this.state.selected));
        });

        const nonInterestMenu = BrowsePostMenu(this.props.nonInterestPosts, this.state.selected);

        return (
            <div style={{ display: "flex-grow", minWidth: 10 }}>
                <div className="page-header">
                    <div className="content-container">
                        {!this.props.isAuthenticated ? (
                            <h1 className="page-header__title">
                                Welcome to <span>UPost</span>. Please
                                <button className="button button--link" onClick={this.handleLoginModalOpen}>
                                    <h1 className="page-header__title">
                                        <span>login</span>
                                    </h1>
                                </button>
                                or
                                <button className="button button--link" onClick={this.handleSignupModalOpen}>
                                    <h1 className="page-header__title">
                                        <span>register</span>
                                    </h1>
                                </button>
                                to use the site!
                            </h1>
                        ) : (
                            <h1 className="page-header__title">
                                Welcome, <span>{`${localStorage.getItem("first_name")}!`}</span>
                            </h1>
                        )}
                    </div>
                </div>
                <div className="content-container-full">
                    {this.props.isAuthenticated && menus.length === 0 && (
                        <div>
                            <h1>
                                There are currently no posts matching your interests for your given communities.
                                <span>
                                    <Link className="link__inline" to="/interests">
                                        Click here to Edit.
                                    </Link>
                                </span>
                            </h1>
                        </div>
                    )}
                    {this.props.interestRandomPosts.map((interestPosts, index) => {
                        return (
                            menus[index].length > 0 && (
                                <div key={interestPosts.tag} className="horizontal-menu_wrapper">
                                    <div className="menu_header">
                                        <h1>{interestPosts.tag}</h1>
                                    </div>
                                    <ScrollMenu
                                        data={menus[index]}
                                        arrowLeft={ArrowLeft}
                                        arrowRight={ArrowRight}
                                        selected={this.state.selected}
                                        onSelect={this.onSelect}
                                    />
                                </div>
                            )
                        );
                    })}

                    {nonInterestMenu.length > 0 && (
                        <div className="horizontal-menu_wrapper">
                            <div className="menu_header">
                                <h1>Other Posts in Your Communities</h1>
                            </div>
                            <ScrollMenu
                                data={nonInterestMenu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                            />
                        </div>
                    )}

                    <SignupModal
                        signupOpen={this.state.signupOpen}
                        handleSignupClose={this.handleSignupModalClose}
                        pageMove={this.moveToInterestPage}
                        closeSignupOpenLoginModal={this.closeSignupOpenLoginModal}
                    />
                    <LoginModal
                        loginOpen={this.state.loginOpen}
                        handleLoginClose={this.handleLoginModalClose}
                        closeLoginOpenSignupModal={this.closeLoginOpenSignupModal}
                        handleSucessfulLogin={this.handleSucessfulLogin}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token,
        interests: state.interests.interests,
        userInterests: state.interests.userInterests,
        interestRandomPosts: state.posts.interestRandomPosts,
        nonInterestPosts: state.posts.nonInterestPosts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterests: () => dispatch(getAllInterests()),
        startSetInterestRandomPosts: (interests) => dispatch(startSetInterestRandomPosts(interests)),
        startSetUserInterests: () => dispatch(startSetUserInterests()),
        getNonInterestPosts: () => dispatch(getNonInterestPosts())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);
