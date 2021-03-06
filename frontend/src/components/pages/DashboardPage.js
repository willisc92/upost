import React from "react";
import { connect } from "react-redux";
import { getAllInterests, startSetUserInterests } from "../../actions/interests";
import { startSetInterestRandomPosts, getNonInterestPosts } from "../../actions/posts";
import { BrowsePostMenu } from "../MyPostSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";
import SignupModal from "../modals/SignupModal";
import LoginModal from "../modals/LoginModal";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MenuHeader from "../menus/MenuHeader";
import ButtonBase from "@material-ui/core/ButtonBase";
import { HelpToolTip } from "../HelpTooltip";
import Loading from "./LoadingPage";
import { getMyCommunities } from "../../actions/communities";

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            loginOpen: false,
            signupOpen: false,
            error: undefined,
            loading: true
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

    handleSuccessfulLogin = async () => {
        await this.handleLoginModalClose();
        // this.props.history.push("/");

        this.handleLoginModalClose();
        this.props.getMyCommunities().then(
            this.props.startSetUserInterests().then(() => {
                if (this.props.userCommunities.length === 0 && this.props.userInterests.length === 0) {
                    this.props.history.push("/interests");
                } else {
                    this.props.history.push("/");
                }
            })
        );
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.startSetUserInterests().then(() => {
                this.props.startSetInterestRandomPosts(this.props.userInterests).then(() => {
                    this.setState(() => ({ loading: false }));
                });
            });

            this.props
                .getNonInterestPosts()
                .then(() => {
                    this.setState(() => ({ loading: false }));
                })
                .catch((err) => console.log(JSON.stringify(err, null, 2)));
        } else {
            if (this.props.interests.length === 0) {
                this.props.getAllInterests().then(() => {
                    this.props.startSetInterestRandomPosts(this.props.interests).then(() => {
                        this.setState(() => ({ loading: false }));
                    });
                });
            } else {
                this.props.startSetInterestRandomPosts(this.props.interests).then(() => {
                    this.setState(() => ({ loading: false }));
                });
            }
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isAuthenticated !== this.props.isAuthenticated) {
            if (newProps.isAuthenticated) {
                this.props.startSetUserInterests().then(() => {
                    this.props.startSetInterestRandomPosts(this.props.userInterests).then(() => {
                        this.setState(() => ({ loading: false }));
                    });
                });
            } else if (this.props.interests.length === 0) {
                this.props.getAllInterests().then(() => {
                    this.props.startSetInterestRandomPosts(this.props.interests).then(() => {
                        this.setState(() => ({ loading: false }));
                    });
                });
            } else {
                this.props.startSetInterestRandomPosts(this.props.interests).then(() => {
                    this.setState(() => ({ loading: false }));
                });
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
        let menus = [];
        let interestRandomPosts = this.props.interestRandomPosts;
        interestRandomPosts.sort((a, b) => {
            return b.posts.length - a.posts.length;
        });
        interestRandomPosts.forEach((element, i) => {
            menus.push(BrowsePostMenu(element.posts, this.state.selected, false));
        });

        const nonInterestMenu = BrowsePostMenu(this.props.nonInterestPosts, this.state.selected, false);

        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
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
                            handleSucessfulLogin={this.handleSuccessfulLogin}
                            history={this.props.history}
                        />

                        {!this.props.isAuthenticated ? (
                            <Box paddingBottom={2}>
                                <Typography variant="h1" gutterBottom>
                                    Welcome to{" "}
                                    <Typography variant="inherit" display="inline" color="primary">
                                        UPost!
                                    </Typography>
                                </Typography>
                                <Typography variant="h2">
                                    <Typography variant="inherit" display="inline">
                                        Please{" "}
                                    </Typography>
                                    <Typography variant="inherit" display="inline" color="primary">
                                        <ButtonBase onClick={this.handleLoginModalOpen}>login </ButtonBase>
                                    </Typography>
                                    <Typography variant="inherit" display="inline">
                                        {" "}
                                        or{" "}
                                    </Typography>
                                    <Typography variant="inherit" display="inline" color="primary">
                                        <ButtonBase onClick={this.handleSignupModalOpen}>register</ButtonBase>
                                    </Typography>

                                    <Typography variant="inherit" display="inline">
                                        {" "}
                                        to use the site!
                                    </Typography>
                                </Typography>
                            </Box>
                        ) : (
                            <Box paddingBottom={2}>
                                <Typography variant="h1">
                                    Welcome,{" "}
                                    <Typography
                                        variant="inherit"
                                        display="inline"
                                        color="primary"
                                    >{`${localStorage.getItem("first_name")}!`}</Typography>
                                    <HelpToolTip
                                        jsx={
                                            <React.Fragment>
                                                <Typography variant="caption">
                                                    This is your dashboard page!
                                                    <ul>
                                                        <li>
                                                            Here you can see posts that are relevant to your interests
                                                            within your communities!
                                                        </li>
                                                        <li> Posts are separated by your given interests.</li>
                                                    </ul>
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </Typography>
                            </Box>
                        )}
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    {!this.state.loading ? (
                        <Box>
                            {this.props.isAuthenticated && menus.length === 0 && (
                                <Box py={2}>
                                    <Typography variant="h3">
                                        There are currently no posts matching your interests for your given communities.
                                        {"  "}
                                        <Typography variant="inherit" display="inline" color="primary">
                                            <ButtonBase
                                                onClick={() => {
                                                    this.props.history.push("/interests");
                                                }}
                                            >
                                                Click Here to Edit.
                                            </ButtonBase>
                                        </Typography>
                                    </Typography>
                                </Box>
                            )}
                            {this.props.interestRandomPosts.map((interestPosts, index) => {
                                return (
                                    menus[index].length > 0 && (
                                        <Box py={2} key={interestPosts.tag}>
                                            {MenuHeader(interestPosts.tag)}
                                            <ScrollMenu
                                                data={menus[index]}
                                                arrowLeft={ArrowLeft}
                                                arrowRight={ArrowRight}
                                                selected={this.state.selected}
                                                onSelect={this.onSelect}
                                                hideArrows
                                                hideSingleArrow
                                                alignCenter={false}
                                            />
                                        </Box>
                                    )
                                );
                            })}

                            {nonInterestMenu.length > 0 && (
                                <Box py={2}>
                                    {MenuHeader("Other posts in your Communities")}
                                    <ScrollMenu
                                        data={nonInterestMenu}
                                        arrowLeft={ArrowLeft}
                                        arrowRight={ArrowRight}
                                        selected={this.state.selected}
                                        onSelect={this.onSelect}
                                        hideArrows
                                        hideSingleArrow
                                        alignCenter={false}
                                    />
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Box py={2}>
                            <Loading />
                        </Box>
                    )}
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token,
        interests: state.interests.interests,
        userInterests: state.interests.userInterests,
        interestRandomPosts: state.posts.interestRandomPosts,
        nonInterestPosts: state.posts.nonInterestPosts,
        userCommunities: state.communities.userCommunities.community
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterests: () => dispatch(getAllInterests()),
        startSetInterestRandomPosts: (interests) => dispatch(startSetInterestRandomPosts(interests)),
        startSetUserInterests: () => dispatch(startSetUserInterests()),
        getNonInterestPosts: () => dispatch(getNonInterestPosts()),
        getMyCommunities: () => dispatch(getMyCommunities())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);
