import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import SignupModal from "../components/modals/SignupModal";
import LoginModal from "../components/modals/LoginModal";
import Drawer from "./Drawer";
import { SearchBar } from "./SearchBar";
import { Button, AppBar } from "@material-ui/core";
import { MyAccountMenu } from "./MyAccountMenu";

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
        this.props.history.push("/");
    };

    render() {
        return (
            <div className="header">
                <AppBar position="static" color="primary">
                    <div className="header__content">
                        <div>
                            <Drawer history={this.props.history} />
                        </div>
                        {!!this.props.token && <SearchBar history={this.props.history} />}
                        {!!this.props.token ? (
                            <div>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        this.props.history.push("/myChannels");
                                    }}
                                >
                                    <img
                                        className="header_mycontent_logo"
                                        src={CDNLink + "/dist/images/mycontent.png"}
                                    />
                                    My Content
                                </Button>
                                <MyAccountMenu history={this.props.history} />
                                <Button variant="text" onClick={this.props.logout}>
                                    <i className="material-icons">exit_to_app</i>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button variant="text" onClick={this.handleLoginModalOpen}>
                                    <i className="material-icons">exit_to_app</i> Login
                                </Button>
                                <Button variant="text" onClick={this.handleSignupModalOpen}>
                                    <i className="material-icons">person_add</i>
                                    Signup
                                </Button>
                            </div>
                        )}
                    </div>
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
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: !!state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
