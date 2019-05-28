import React from "react";
import { SingleDatePicker } from "react-dates";
import Select from "react-select";
import moment from "moment";
import API from "../utils/API";
import emailValidator from "email-validator";

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

    componentDidMount() {
        API.get("interests/").then(
            (result) => {
                const interests = result.data.map((interest) => {
                    return { value: interest.interest_tag, label: interest.interest_tag };
                });
                this.setState({
                    isLoaded: true,
                    interests: interests
                });
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
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

    onSubmit = (e) => {
        e.preventDefault();
        const input = e.target;
        let error = {};

        // validate email
        if (!emailValidator.validate(input.email.value)) {
            error.email = ["Invalid email entered"];
        }

        // check password
        if (input.password.value !== input.passwordConfirmation.value) {
            error.password = ["Passwords do not match"];
        } else if (input.password.value.length < this.state.minPasswordLength) {
            error.password = ["Password does not meet minimum length"];
        }

        // check for blanks
        if (input.username.value.length === 0) {
            error.username = ["Field cannot be blank."];
        }
        if (input.firstName.value.length === 0) {
            error.first_name = ["Field cannot be blank."];
        }
        if (input.lastName.value.length === 0) {
            error.last_name = ["Field cannot be blank."];
        }
        if (input.country.value.length === 0) {
            error.country = ["Field cannot be blank."];
        }
        if (input.state.value.length === 0) {
            error.state = ["Field cannot be blank."];
        }
        if (input.streetName.value.length === 0) {
            error.street_name = ["Field cannot be blank."];
        }
        if (input.postalCode.value.length === 0) {
            error.postal_code = ["Field cannot be blank."];
        }
        if (input.city.value.length === 0) {
            error.city = ["Field cannot be blank."];
        }
        if (input.interests.value.length === 0) {
            error.interests = ["Field must contain atleast 1 selected choice"];
        }

        if (!this.isEmpty(error)) {
            this.setState({ error: error });
            return;
        }

        const user = {
            password: input.password.value,
            username: input.username.value,
            email: input.email.value,
            first_name: input.firstName.value,
            middle_name: input.middleName.value,
            last_name: input.lastName.value,
            birth_date: this.state.date.format("YYYY-MM-DD"),
            country: input.country.value,
            state: input.state.value,
            street_name: input.streetName.value,
            postal_code: input.postalCode.value,
            city: input.city.value,
            sex: input.sex.value === "Male" ? "M" : "F",
            phone_number: input.phoneNumber.value,
            interests: this.state.selectedInterests.map((interest) => {
                return interest.value;
            })
        };

        API.post("accounts/", user)
            .then(() => {
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log("error in account creation", error);
                console.log(error.response.request.response);
                this.setState({ error: error.response.request.response });
            });

        console.log(user);
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
                    <form className="form" onSubmit={this.onSubmit}>
                        <p>Username*</p>
                        {!!this.state.error &&
                            !!this.state.error.username &&
                            this.state.error.username.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="username" />
                        <p>150 characters of fewer. Letters, digits and @/./+/-/) only.</p>
                        <p>Email Address</p>
                        {!!this.state.error &&
                            !!this.state.error.email &&
                            this.state.error.email.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="email" />
                        <p>First Name*</p>
                        {!!this.state.error &&
                            !!this.state.error.first_name &&
                            this.state.error.first_name.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="firstName" />
                        <p>Middle Name</p>
                        <input type="text" className="text-input" name="middleName" />
                        <p>Last Name*</p>
                        {!!this.state.error &&
                            !!this.state.error.last_name &&
                            this.state.error.last_name.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="lastName" />
                        <p>Birth date</p>
                        <SingleDatePicker
                            date={this.state.date}
                            onDateChange={this.onDateChange}
                            focused={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={(day) => false}
                        />
                        <p>Country*</p>
                        {!!this.state.country &&
                            !!this.state.error.country &&
                            this.state.error.country.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="country" />
                        <p>State*</p>
                        {!!this.state.state &&
                            !!this.state.error.state &&
                            this.state.error.state.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="state" />
                        <p>Steet Name*</p>
                        {!!this.state.error &&
                            !!this.state.error.street_name &&
                            this.state.error.street_name.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="streetName" />
                        <p>Postal Code*</p>
                        {!!this.state.error &&
                            !!this.state.error.postal_code &&
                            this.state.error.postal_code.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="postalCode" />
                        <p>City*</p>
                        {!!this.state.error &&
                            !!this.state.error.city &&
                            this.state.error.city.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="city" />
                        <p>Sex</p>
                        <select name="sex" className="select">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        <p>Phone Number</p>
                        <input type="text" className="text-input" name="phoneNumber" />
                        <p>Interests*</p>
                        {!!this.state.error &&
                            !!this.state.error.interests &&
                            this.state.error.interests.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <Select
                            value={this.state.selectedInterests}
                            onChange={this.onInterestChange}
                            options={this.state.interests}
                            isMulti
                            name="interests"
                        />
                        <p>Password</p>
                        <p>Your password contain at least {this.state.minPasswordLength} characters.</p>
                        {!!this.state.error &&
                            !!this.state.error.password &&
                            this.state.error.password.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="password" />
                        <p>Password Confirmation*</p>
                        {!!this.state.error &&
                            !!this.state.error.password &&
                            this.state.error.password.map((error) => {
                                return (
                                    <p className="form__error" key={error}>
                                        {error}
                                    </p>
                                );
                            })}
                        <input type="text" className="text-input" name="passwordConfirmation" />
                        <br />
                        <div>
                            <button className="button">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpPage;
