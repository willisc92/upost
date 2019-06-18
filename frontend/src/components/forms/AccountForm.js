import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-date-picker";
import moment from "moment";
import API from "../../utils/API";

export class AccountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maxDate: new Date(),
            minDate: new Date(1900, 1, 1),
            birthDate: new Date(),
            isLoaded: false,
            interests: [],
            error: undefined,
            selectedInterests: []
        };
    }

    onDateChange = (date) => {
        this.setState({
            birthDate: date
        });
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
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
            birthDate: this.state.birthDate
        });
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <p>Username*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.username &&
                    this.props.auth.error.username.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input type="text" className="text-input" name="username" />
                <p>150 characters of fewer. Letters, digits and @/./+/-/) only.</p>
                <p>Email Address</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.email &&
                    this.props.auth.error.email.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input type="text" className="text-input" name="email" />
                <p>First Name*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.first_name &&
                    this.props.auth.error.first_name.map((error) => {
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
                {!!this.props.auth.error &&
                    !!this.props.auth.error.last_name &&
                    this.props.auth.error.last_name.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input type="text" className="text-input" name="lastName" />
                <p>Birth date</p>
                <DatePicker
                    value={this.state.birthDate}
                    onChange={this.onDateChange}
                    maxDate={this.state.maxDate}
                    minDate={this.state.minDate}
                    minDetail="decade"
                />
                <p>Password</p>
                <p>Your password contain at least {this.props.minPasswordLength} characters.</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.password &&
                    this.props.auth.error.password.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input type="password" className="text-input" name="password" />
                <p>Password Confirmation*</p>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.password &&
                    this.props.auth.error.password.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input type="password" className="text-input" name="passwordConfirmation" />
                <br />
                <button className="button">Sign Up</button>
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
