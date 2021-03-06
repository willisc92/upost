import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import SignupModal from "./modals/SignupModal";
import LoginModal from "./modals/LoginModal";
import { SearchBar } from "./SearchBar";
import { MyAccountMenu } from "./MyAccountMenu";
import { WhiteButton } from "../components/Buttons";
import { startSetUserInterests } from "../actions/interests";
import { getMyCommunities } from "../actions/communities";
import Box from "@material-ui/core/Box";
import { GoogleLogout } from "react-google-login";
import { googleClientID } from "../utils/localAPIConfig";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginOpen: false,
            signupOpen: false,
            error: undefined
        };
    }

    handleLoginModalOpen = () => {
        this.setState(() => {
            return { loginOpen: true, signupOpen: false };
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
            return { signupOpen: true, loginOpen: false };
        });
    };

    moveToInterestPage = () => {
        this.handleSignupModalClose();
        this.props.history.push("/interests");
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
        this.props.getMyCommunities().then(
            this.props.startSetUserInterests().then(() => {
                if (this.props.userCommunities.length === 0 && this.props.userInterests.length === 0) {
                    this.props.history.push("/interests");
                } else {
                    this.redirectHome();
                }
            })
        );
    };

    redirectHome = () => {
        this.props.history.push("/");
    };

    render() {
        return (
            <React.Fragment>
                {!!this.props.token && <SearchBar history={this.props.history} />}
                {!!this.props.token ? (
                    <Box display="flex" flexWrap="nowrap">
                        <WhiteButton
                            variant="text"
                            onClick={() => {
                                this.props.history.push("/myChannels");
                            }}
                        >
                            <i className="material-icons">create</i>
                            My Content
                        </WhiteButton>
                        <MyAccountMenu history={this.props.history} />
                        {!!localStorage.getItem("googleToken") ? (
                            <GoogleLogout
                                clientId={googleClientID}
                                render={(renderProps) => (
                                    <WhiteButton
                                        variant="text"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <i className="material-icons">exit_to_app</i> Logout
                                    </WhiteButton>
                                )}
                                onLogoutSuccess={this.props.logout}
                            />
                        ) : (
                            <WhiteButton variant="text" onClick={this.props.logout}>
                                <i className="material-icons">exit_to_app</i> Logout
                            </WhiteButton>
                        )}
                    </Box>
                ) : (
                    <Box display="flex" flexWrap="nowrap">
                        <WhiteButton variant="text" onClick={this.handleSignupModalOpen}>
                            <i className="material-icons">person_add</i> Signup
                        </WhiteButton>

                        <WhiteButton variant="text" onClick={this.handleLoginModalOpen}>
                            <i className="material-icons">exit_to_app</i> Login
                        </WhiteButton>
                    </Box>
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
                    history={this.props.history}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: !!state.auth.token,
    userInterests: state.interests.userInterests,
    userCommunities: state.communities.userCommunities.community
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    startSetUserInterests: () => dispatch(startSetUserInterests()),
    getMyCommunities: () => dispatch(getMyCommunities())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
