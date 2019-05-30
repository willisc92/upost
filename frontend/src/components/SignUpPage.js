import React from "react";
import { connect } from "react-redux";
import AccountForm from "./AccountForm.js";
import moment from "moment";
import API from "../utils/API";
import emailValidator from "email-validator";
import { authFail } from "../actions/auth";

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarFocused: false,
            date: moment(),
            birthDate: moment(),
            isLoaded: false,
            interests: [],
            error: undefined,
            selectedInterests: [],
            minPasswordLength: 8
        };
    }

    onDateChange = (birthDate) => {
        if (birthDate) {
            this.setState(() => ({ birthDate }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onInterestChange = (selectedOption) => {
        this.setState({ selectedInterests: selectedOption });
    };

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
        if (input.interests.length === 0) {
            error.interests = ["Field must contain atleast 1 selected choice"];
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
            interests: input.interests
        };

        API.post("accounts/", user)
            .then(() => {
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log("error in account creation", error);
                this.props.authFail(error.response.request.response);
            });
    };

    render() {
        return <AccountForm onSubmit={this.onSubmit} />;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authFail: (error) => dispatch(authFail(error))
    };
};

export default connect(
    undefined,
    mapDispatchToProps
)(SignUpPage);
