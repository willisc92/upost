import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import AccountForm from "../forms/AccountForm";
import emailValidator from "email-validator";
import { authFail, authSignup, authLogin, resendActivationEmail } from "../../actions/auth";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class SignupModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: undefined,
            minPasswordLength: 8,
            successfulCreation: false
        };
    }

    componentWillMount() {
        Modal.setAppElement("body");
    }

    isEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };

    signupOnSubmit = (input) => {
        let error = {};

        const formInput = input.formInput;

        // validate email
        if (!emailValidator.validate(formInput.email.value)) {
            error.email = ["Invalid email entered"];
        }

        // check password
        if (formInput.password.value !== formInput.passwordConfirmation.value) {
            error.password = ["Passwords do not match"];
        } else if (formInput.password.value.length < this.state.minPasswordLength) {
            error.password = ["Password does not meet minimum length"];
        }

        // check for blanks
        if (formInput.username.value.length === 0) {
            error.username = ["Field cannot be blank."];
        }
        if (formInput.firstName.value.length === 0) {
            error.first_name = ["Field cannot be blank."];
        }
        if (formInput.lastName.value.length === 0) {
            error.last_name = ["Field cannot be blank."];
        }
        if (!input.birthDate) {
            error.birth_date = ["Field cannot be blank."];
        }

        if (!this.isEmpty(error)) {
            console.log("client side error", error);
            this.props.authFail(error);
            return;
        }

        const user = {
            password: formInput.password.value,
            username: formInput.username.value,
            email: formInput.email.value,
            first_name: formInput.firstName.value,
            middle_name: formInput.middleName.value,
            last_name: formInput.lastName.value,
            birth_date: input.birthDate.toISOString().split("T")[0]
        };

        this.props
            .authSignup(user)
            .then(() => {
                this.setState(() => {
                    return { successfulCreation: true };
                });
            })
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
    };

    resendEmail = () => {
        resendActivationEmail();
    };

    render() {
        return (
            <Modal
                className="modal"
                isOpen={this.props.signupOpen}
                contentLabel="Sign Up"
                onRequestClose={this.props.handleSignupClose}
                closeTimeoutMS={200}
            >
                <div className="modal__header">
                    <img className="modal__logo" src={CDNLink + "/dist/images/logo.png"} />
                    <div>
                        <Typography variant="h5" style={{ textAlign: "left" }}>
                            Create Your U-Post Account
                        </Typography>
                        <Typography variant="h6" style={{ textAlign: "left" }}>
                            to continue
                        </Typography>
                    </div>
                </div>
                {this.state.successfulCreation ? (
                    <div>
                        <Typography>A confirmation email has been sent.</Typography>
                        <Typography>
                            Please check your email to proceed. If no message appears please check your spam inbox.
                        </Typography>
                        <Typography>
                            click{" "}
                            <Typography color="primary" component="span" onClick={this.resendEmail}>
                                here
                            </Typography>{" "}
                            to resend the email.
                        </Typography>
                    </div>
                ) : (
                    <div>
                        <AccountForm
                            minPasswordLength={this.state.minPasswordLength}
                            onSubmit={this.signupOnSubmit}
                            id="signup"
                        />
                        <div className="modal__buttons">
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ margin: 5 }}
                                type="submit"
                                form="signup"
                            >
                                Sign Up
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ margin: 5 }}
                                onClick={this.props.closeSignupOpenLoginModal}
                            >
                                Login instead
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authFail: (error) => dispatch(authFail(error)),
        authSignup: (user) => dispatch(authSignup(user)),
        authLogin: (username, password) => dispatch(authLogin(username, password))
    };
};

export default connect(
    undefined,
    mapDispatchToProps
)(SignupModal);
