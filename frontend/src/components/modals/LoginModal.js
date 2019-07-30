import React from "react";
import Modal from "react-modal";
import LoginForm from "../forms/LoginForm";
import RecoveryForm from "../forms/RecoveryForm";
import { connect } from "react-redux";
import { authFail, authLogin, passwordResetRequest } from "../../actions/auth";
import emailValidator from "email-validator";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
                        <Typography variant="h5" style={{ textAlign: "left" }}>
                            Find Your Email
                        </Typography>
                    ) : (
                        <Typography variant="h5" style={{ textAlign: "left" }}>
                            Login to your U-Post Account
                        </Typography>
                    )}
                </div>
                {this.state.passwordRecovery ? (
                    this.state.passwordRecoveryEmailSent ? (
                        <React.Fragment>
                            <Typography variant="body1">A recovery email has been sent.</Typography>
                            <Typography variant="body1">
                                Please check your email to proceed. If no message appears please check your spam inbox
                            </Typography>
                            <Typography variant="body1">
                                click{" "}
                                <Typography
                                    onClick={this.resendEmail}
                                    color="primary"
                                    style={{ display: "inline-block" }}
                                    component="span"
                                    variant="body1"
                                >
                                    here
                                </Typography>{" "}
                                to resend the email.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <RecoveryForm onSubmit={this.recoveryOnSubmit} id="recovery" />
                            <Typography variant="body1" onClick={this.changePasswordRecovery} gutterBottom>
                                Return to Login
                            </Typography>
                            <div className="modal_buttons">
                                <Button color="primary" variant="contained" type="submit" form="recovery">
                                    Send Email
                                </Button>
                            </div>
                        </React.Fragment>
                    )
                ) : (
                    <React.Fragment>
                        <LoginForm onSubmit={this.loginOnSubmit} id="login" />
                        <Typography variant="body1" onClick={this.changePasswordRecovery} gutterBottom>
                            Forgot Password?
                        </Typography>
                        <div className="modal__buttons">
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ margin: 5 }}
                                type="submit"
                                form="login"
                            >
                                Login
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ margin: 5 }}
                                onClick={this.props.closeLoginOpenSignupModal}
                            >
                                Create Account
                            </Button>
                        </div>
                    </React.Fragment>
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
