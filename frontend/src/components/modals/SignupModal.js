import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import AccountForm from "../forms/AccountForm";
import emailValidator from "email-validator";
import { authFail, authSignup } from "../../actions/auth";

class SignupModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: undefined,
            minPasswordLength: 8
        };
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
                this.props.pageMove();
            })
            .catch((error) => {
                console.log("An error has occured with signup", error);
            });
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
                <AccountForm minPasswordLength={this.state.minPasswordLength} onSubmit={this.signupOnSubmit} />
                <button className="button" onClick={this.props.closeSignupOpenLoginModal}>
                    Login instead
                </button>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authFail: (error) => dispatch(authFail(error)),
        authSignup: (user) => dispatch(authSignup(user))
    };
};

export default connect(
    undefined,
    mapDispatchToProps
)(SignupModal);
