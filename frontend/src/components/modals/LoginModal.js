import React from "react";
import Modal from "react-modal";
import LoginForm from "../forms/LoginForm";
import RecoveryForm from "../forms/RecoveryForm";
import { connect } from "react-redux";
import { authFail, authLogin, passwordResetRequest } from "../../actions/auth";
import emailValidator from "email-validator";
import { WhiteRedButton } from "../Buttons";
import Typography from "@material-ui/core/Typography";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            passwordRecovery: false,
            passwordRecoveryEmailSent: false
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
            passwordResetRequest(email).then(() => {
                this.setState(() => {
                    return { passwordRecoveryEmailSent: true };
                });
            });
        }
    };

    changePasswordRecovery = () => {
        this.props.authFail({ error: "" });
        this.setState((prevState) => {
            return { passwordRecovery: !prevState.passwordRecovery };
        });
    };

    resendEmail = () => {
        passwordResetRequest(localStorage.getItem("email"));
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
                            <Typography variant="h6" style={{ textAlign: "left" }}>
                                Find Your Email
                            </Typography>
                            <Typography variant="h6" style={{ textAlign: "left" }}>
                                Enter your account email
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h6" style={{ textAlign: "left" }}>
                                Login to your U-post Account
                            </Typography>
                            <Typography variant="h6" style={{ textAlign: "left" }}>
                                to continue
                            </Typography>
                        </div>
                    )}
                </div>
                {this.state.passwordRecovery ? (
                    this.state.passwordRecoveryEmailSent ? (
                        <div>
                            <Typography>A recovery email has been sent.</Typography>
                            <Typography>
                                Please check your email to proceed. If no message appears please check your spam inbox
                            </Typography>
                            <Typography>
                                click{" "}
                                <Typography
                                    onClick={this.resendEmail}
                                    color="primary"
                                    style={{ display: "inline-block" }}
                                    component="span"
                                >
                                    here
                                </Typography>{" "}
                                to resend the email.
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <RecoveryForm onSubmit={this.recoveryOnSubmit} id="recovery" />
                            <Typography onClick={this.changePasswordRecovery}>Return to Login</Typography>
                            <div className="modal_buttons">
                                <WhiteRedButton className="button modal__button" type="submit" form="recovery">
                                    Send Email
                                </WhiteRedButton>
                            </div>
                        </div>
                    )
                ) : (
                    <div>
                        <LoginForm onSubmit={this.loginOnSubmit} id="login" />
                        <Typography onClick={this.changePasswordRecovery}>Forgot Password?</Typography>
                        <div className="modal__buttons">
                            <WhiteRedButton color="primary" type="submit" form="login">
                                Login
                            </WhiteRedButton>
                            <WhiteRedButton className="button" onClick={this.props.closeLoginOpenSignupModal}>
                                Create Account
                            </WhiteRedButton>
                        </div>
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
