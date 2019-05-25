import React from "react";
import { SingleDatePicker } from "react-dates";
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
            error: undefined
        };
    }

    componentDidMount() {
        API.get("interests/").then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    interests: result.data
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

    onSubmit = (e) => {
        e.preventDefault();
        const input = e.target;

        // validate email
        if (!emailValidator.validate(input.email.value)) {
            alert("invalid email");
        }

        // check password
        if (input.password.value !== input.passwordConfirmation.value) {
            alert("passwords don't match");
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
            interests: [input.interests.value]
        };

        API.post("accounts/", user)
            .then((response) => {
                console.log(response);
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
            <form onSubmit={this.onSubmit}>
                <p>Username*</p>
                {!!this.state.error.username && <p>{this.state.error.username}</p>}
                <input type="text" name="username" />
                <p>150 characters of fewer. Letters, digits and @/./+/-/) only.</p>
                <p>Email Address</p>
                <input type="text" name="email" />
                <p>First Name*</p>
                <input type="text" name="firstName" />
                <p>Middle Name*</p>
                <input type="text" name="middleName" />
                <p>Last Name*</p>
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
                <input type="text" name="country" />
                <p>State*</p>
                <input type="text" name="state" />
                <p>Steet Name*</p>
                <input type="text" name="streetName" />
                <p>Postal Code*</p>
                <input type="text" name="postalCode" />
                <p>City*</p>
                <input type="text" name="city" />
                <p>Sex</p>
                <select name="sex">
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <p>Phone Number</p>
                <input type="text" name="phoneNumber" />
                <p>Interests*</p>
                <select name="interests">
                    {this.state.interests.map((interest) => {
                        return <option key={interest.interest_tag}>{interest.interest_tag}</option>;
                    })}
                </select>
                <p>Password</p>
                <input type="text" name="password" />
                <p>Password Confirmation*</p>
                <input type="text" name="passwordConfirmation" />
                <br />
                <button>Sign Up</button>
            </form>
        );
    }
}

export default SignUpPage;
