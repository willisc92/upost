import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import SignupModal from "../components/modals/SignupModal";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signupOpen: false,
            error: undefined
        };
    }

    handleSignupClose = () => {
        this.setState(() => {
            return { signupOpen: false };
        });
    };

    handleSignupOpen = () => {
        this.setState(() => {
            return { signupOpen: true };
        });
    };

    moveToInterestPage = () => {
        this.handleSignupClose();
        this.props.history.push("/interests");
    };

    render() {
        return (
            <header className="header">
                <div className="content-container">
                    <div className="header__content">
                        <Link to="/">
                            <img className="header__logo" src="dist/images/logo.png" />
                        </Link>
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
                                <Link className="button button--link" to="/login">
                                    Login
                                </Link>
                                <button className="button button--link" onClick={this.handleSignupOpen}>
                                    Signup
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <SignupModal
                    signupOpen={this.state.signupOpen}
                    handleSignupClose={this.handleSignupClose}
                    pageMove={this.moveToInterestPage}
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
