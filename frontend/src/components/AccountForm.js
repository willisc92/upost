import React from "react";
import { connect } from "react-redux";
import { SingleDatePicker } from "react-dates";
import Select from "react-select";
import moment from "moment";
import API from "../utils/API";

class AccountForm extends React.Component {
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

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            formInput: e.target,
            interests: this.state.selectedInterests.map((interest) => {
                return interest.value;
            }),
            date: this.state.date,
            birthDate: this.state.birthDate
        });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>Username*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.username &&
                    this.props.auth.error.username.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="username" />
                <p>150 characters of fewer. Letters, digits and @/./+/-/) only.</p>
                <p>Email Address</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.email &&
                    this.props.auth.error.email.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="email" />
                <p>First Name*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.first_name &&
                    this.props.auth.error.first_name.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="firstName" />
                <p>Middle Name</p>
                <input type="text" name="middleName" />
                <p>Last Name*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.last_name &&
                    this.props.auth.error.last_name.map((error) => {
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
                {!!this.props.auth.error &&
                    !!this.props.auth.error.country &&
                    this.props.auth.error.country.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="country" />
                <p>State*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.state &&
                    this.props.auth.error.state.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="state" />
                <p>Steet Name*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.street_name &&
                    this.props.auth.error.street_name.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="streetName" />
                <p>Postal Code*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.postal_code &&
                    this.props.auth.error.postal_code.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="postalCode" />
                <p>City*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.city &&
                    this.props.auth.error.city.map((error) => {
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
                {!!this.props.auth.error &&
                    !!this.props.auth.error.interests &&
                    this.props.auth.error.interests.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <Select
                    value={this.state.selectedInterests}
                    onChange={this.onInterestChange}
                    options={this.state.interests}
                    isMulti
                    name="interests"
                />
                <p>Password</p>
                <p>Your password contain at least {this.props.minPasswordLength} characters.</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.password &&
                    this.props.auth.error.password.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="password" />
                <p>Password Confirmation*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.password &&
                    this.props.auth.error.password.map((error) => {
                        return <p key={error}>{error}</p>;
                    })}
                <input type="text" name="passwordConfirmation" />
                <br />
                <button>Sign Up</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(AccountForm);
