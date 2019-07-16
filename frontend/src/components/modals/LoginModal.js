import React from "react";
import Modal from "react-modal";
import LoginForm from "../forms/LoginForm";
import RecoveryForm from "../forms/RecoveryForm";
import { connect } from "react-redux";
import { authFail, authLogin } from "../../actions/auth";
import emailValidator from "email-validator";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            passwordRecovery: false
        };
    }

    componentWillMount() {
        Modal.setAppElement("body");
    }

    loginOnSubmit = ({ username, password }) => {
        if (!username || !password) {
            this.props.authFail({ error: "Please provide both username and password." });
        } else {
            this.props.authFail({ error: "" });
            this.props
                .authLogin(username, password)
                .then(() => {
                    this.props.handleSucessfulLogin();
                })
                .catch((error) => {
                    console.log(JSON.stringify(error, null, 2));
                });
        }
    };

    recoveryOnSubmit = ({ email }) => {
        if (!email) {
            this.props.authFail({ error: "Please provide an email." });
        } else if (!emailValidator.validate(email)) {
            this.props.authFail({ error: "Please enter a valid email." });
        } else {
            this.props.authFail({ error: "" });
        }
    };

    changePasswordRecovery = () => {
        this.props.authFail({ error: "" });
        this.setState((prevState) => {
            return { passwordRecovery: !prevState.passwordRecovery };
        });
    };

    render() {
        return (
            <Modal
                className="modal"
                isOpen={this.props.loginOpen}
                contentLabel="Login"
                onRequestClose={this.props.handleLoginClose}
                closeTimeoutMS={200}
            >
                <div className="modal__header">
                    <img className="modal__logo" src={CDNLink + "/dist/images/logo.png"} />
                    {this.state.passwordRecovery ? (
                        <div>
                            <p className="modal__header__label">Find Your Email</p>
                            <p className="modal__header__sublabel">Enter your account email</p>
                        </div>
                    ) : (
                        <div>
                            <p className="modal__header__label">Login to Your U-post Account</p>
                            <p className="modal__header__sublabel">to continue</p>
                        </div>
                    )}
                </div>
                {this.state.passwordRecovery ? (
                    <RecoveryForm onSubmit={this.recoveryOnSubmit} id="recovery" />
                ) : (
                    <LoginForm onSubmit={this.loginOnSubmit} id="login" />
                )}
                <p className="modal__text_button" onClick={this.changePasswordRecovery}>
                    {this.state.passwordRecovery ? "Return to Login" : "Forgot Password?"}
                </p>
                {this.state.passwordRecovery ? (
                    <div className="modal_buttons">
                        <button className="button modal__button" type="submit" form="recovery">
                            Send Email
                        </button>
                    </div>
                ) : (
                    <div className="modal__buttons">
                        <button className="button modal__button" type="submit" form="login">
                            Login
                        </button>
                        <button className="button" onClick={this.props.closeLoginOpenSignupModal}>
                            Create Account
                        </button>
                    </div>
                )}
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    token: !!state.auth.token
});

const mapDispatchToProps = (dispatch) => {
    return {
        authFail: (error) => dispatch(authFail(error)),
        authLogin: (username, password) => dispatch(authLogin(username, password))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);
