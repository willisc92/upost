import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import SignupModal from "../components/modals/SignupModal";
import LoginModal from "../components/modals/LoginModal";
import SideBar from "../components/SideBar";
import { SearchBar } from "../components/SearchBar";

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
            <header className="header">
                <div className="header__content">
                    <div>
                        <SideBar />
                        <Link to="/" className="header__logo_wrapper">
                            <img className="header__logo" src={CDNLink + "/dist/images/logo.png"} />
                        </Link>
                    </div>
                    {!!this.props.token && <SearchBar history={this.props.history} />}
                    {!!this.props.token ? (
                        <div>
                            <Link className="button button--link" to="/myChannels">
                                My Content
                            </Link>
                            <button className="button button--link" onClick={this.props.logout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button className="button button--link" onClick={this.handleLoginModalOpen}>
                                Login
                            </button>
                            <button className="button button--link" onClick={this.handleSignupModalOpen}>
                                Signup
                            </button>
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
            </header>
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
