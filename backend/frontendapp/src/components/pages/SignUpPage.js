import React from "react";
import { connect } from "react-redux";
import AccountForm from "../forms/AccountForm.js";
import moment from "moment";
import emailValidator from "email-validator";
import { authFail, authSignup } from "../../actions/auth";

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarFocused: false,
            date: moment(),
            birthDate: moment(),
            isLoaded: false,
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

    onSubmit = (input) => {
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
        if (formInput.country.value.length === 0) {
            error.country = ["Field cannot be blank."];
        }
        if (formInput.state.value.length === 0) {
            error.state = ["Field cannot be blank."];
        }
        if (formInput.streetName.value.length === 0) {
            error.street_name = ["Field cannot be blank."];
        }
        if (formInput.postalCode.value.length === 0) {
            error.postal_code = ["Field cannot be blank."];
        }
        if (formInput.city.value.length === 0) {
            error.city = ["Field cannot be blank."];
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
            birth_date: input.date.format("YYYY-MM-DD"),
            country: formInput.country.value,
            state: formInput.state.value,
            street_name: formInput.streetName.value,
            postal_code: formInput.postalCode.value,
            city: formInput.city.value,
            sex: formInput.sex.value === "Male" ? "M" : "F",
            phone_number: formInput.phoneNumber.value,
            channels: [] // not ideal, ideally don't include fields we dont need have django handle
        };

        this.props
            .authSignup(user)
            .then(() => {
                this.props.history.push("/interests");
            })
            .catch((error) => {
                console.log("An error has occured with signup", error);
            });
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page_header__title"> SignUp </h1>
                    </div>
                </div>
                <div className="content-container">
                    <AccountForm onSubmit={this.onSubmit} minPasswordLength={this.state.minPasswordLength} />
                </div>
            </div>
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
)(SignUpPage);
