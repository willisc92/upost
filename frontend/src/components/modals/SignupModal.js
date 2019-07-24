import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import AccountForm from "../forms/AccountForm";
import emailValidator from "email-validator";
import { authFail, authSignup, authLogin, resendActivationEmail } from "../../actions/auth";

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
                        <p className="modal__header__label">Create Your U-post Account</p>
                        <p className="modal__header__sublabel">to continue</p>
                    </div>
                </div>
                {this.state.successfulCreation ? (
                    <div>
                        <p className="modal__text">A confirmation email has been sent.</p>
                        <p className="modal__text">
                            Please check your email to proceed. If no message appears please check your spam inbox.
                        </p>
                        <p className="modal__text">
                            click <span onClick={this.resendEmail}>here</span> to resend the email.
                        </p>
                    </div>
                ) : (
                    <div>
                        <AccountForm
                            minPasswordLength={this.state.minPasswordLength}
                            onSubmit={this.signupOnSubmit}
                            id="signup"
                        />
                        <div className="modal__buttons">
                            <button className="button modal__button" type="submit" form="signup">
                                Sign Up
                            </button>
                            <button className="button" onClick={this.props.closeSignupOpenLoginModal}>
                                Login instead
                            </button>
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
