import React from "react";
import { connect } from "react-redux";
import { logout, exchangeGoogleToken } from "../actions/auth";
import SignupModal from "./modals/SignupModal";
import LoginModal from "./modals/LoginModal";
import { SearchBar } from "./SearchBar";
import { MyAccountMenu } from "./MyAccountMenu";
import { WhiteButton } from "../components/Buttons";
/*import {
    getAllInterests,
    startSetUserInterests,
    startEditUserInterests
} from "../../actions/interests";
import { getMyCommunities } from "../../actions/communities";*/
import Box from "@material-ui/core/Box";
import { GoogleLogin, GoogleLogout } from "react-google-login";
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
        this.redirectHome();
        /* if (
            this.props.userCommunities.length === 0 &&
            this.props.userInterests.length === 0
        ) {
            this.props.history.push("/interests");
        } else {
            this.props.history.push("/");
        }*/
    };

    responseGoogle = (response) => {
        this.props
            .exchangeGoogleToken(response.accessToken)
            .then(() => {})
            .catch((err) => {
                console.log(err);
            });

        this.redirectHome();
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
                                className="customGoogleButton"
                                clientId={googleClientID}
                                buttonText="LOGOUT"
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
                        <GoogleLogin
                            className="customGoogleButton"
                            clientId={googleClientID}
                            buttonText="LOGIN WITH GOOGLE"
                            onSuccess={this.responseGoogle}
                            onFailure={this.redirectHome}
                            cookiePolicy={"single_host_origin"}
                        />
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
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: !!state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    exchangeGoogleToken: (googleToken) => dispatch(exchangeGoogleToken(googleToken))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
