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
            selectedInterests: []
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
        console.log(selectedOption);
        this.setState({ selectedInterests: selectedOption });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const input = e.target;

        // validate email
        if (!emailValidator.validate(input.email.value)) {
            this.setState({ error: { email: "Invalid email entered" } });
            return;
        }

        // check password
        if (input.password.value !== input.passwordConfirmation.value) {
            this.setState({ error: { password: "Passwords do not match" } });
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
                this.setState({ error: error.response.request.response });
            });

        console.log(user);
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>Username*</p>
                {!!this.state.error &&
                    !!this.state.error.username &&
                    this.state.error.username.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="username" />
                <p>150 characters of fewer. Letters, digits and @/./+/-/) only.</p>
                <p>Email Address</p>
                {!!this.state.error && !!this.state.error.email && <p>{this.state.error.email}</p>}
                <input type="text" name="email" />
                <p>First Name*</p>
                {!!this.state.error &&
                    !!this.state.error.first_name &&
                    this.state.error.first_name.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="firstName" />
                <p>Middle Name</p>
                <input type="text" name="middleName" />
                <p>Last Name*</p>
                {!!this.state.error &&
                    !!this.state.error.last_name &&
                    this.state.error.last_name.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="lastName" />
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
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="country" />
                <p>State*</p>
                {!!this.state.state &&
                    !!this.state.error.state &&
                    this.state.error.state.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="state" />
                <p>Steet Name*</p>
                {!!this.state.error &&
                    !!this.state.error.street_name &&
                    this.state.error.street_name.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="streetName" />
                <p>Postal Code*</p>
                {!!this.state.error &&
                    !!this.state.error.postal_code &&
                    this.state.error.postal_code.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="postalCode" />
                <p>City*</p>
                {!!this.state.error &&
                    !!this.state.error.city &&
                    this.state.error.city.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="city" />
                <p>Sex</p>
                <select name="sex">
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <p>Phone Number</p>
                <input type="text" name="phoneNumber" />
                <p>Interests*</p>
                <Select
                    value={this.state.selectedInterests}
                    onChange={this.onInterestChange}
                    options={this.state.interests}
                    isMulti
                    name="interests"
                />
                <p>Password</p>
                {!!this.state.error &&
                    !!this.state.error.password &&
                    this.state.error.password.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="password" />
                <p>Password Confirmation*</p>
                {!!this.state.error &&
                    !!this.state.error.password &&
                    this.state.error.password.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="passwordConfirmation" />
                <br />
                <button>Sign Up</button>
            </form>
        );
    }
}

export default SignUpPage;
