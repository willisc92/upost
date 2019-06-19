import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-date-picker";
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
                {!!this.props.auth.error &&
                    !!this.props.auth.error.username &&
                    this.props.auth.error.username.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input
                    type="text"
                    className="text-input"
                    name="username"
                    placeholder="Username* (150 characters or fewer)"
                />
                {!!this.props.auth.error &&
                    !!this.props.auth.error.email &&
                    this.props.auth.error.email.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input type="text" className="text-input" name="email" placeholder="Email*" />
                {!!this.props.auth.error &&
                    !!this.props.auth.error.first_name &&
                    this.props.auth.error.first_name.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input type="text" className="text-input" name="firstName" placeholder="First Name*" />
                <input type="text" className="text-input" name="middleName" placeholder="Middle Name" />
                {!!this.props.auth.error &&
                    !!this.props.auth.error.last_name &&
                    this.props.auth.error.last_name.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input type="text" className="text-input" name="lastName" placeholder="Last Name*" />
                <div>
                    <span className="modal__label">Birth Date</span>
                    <DatePicker
                        value={this.state.birthDate}
                        onChange={this.onDateChange}
                        maxDate={this.state.maxDate}
                        minDate={this.state.minDate}
                        minDetail="decade"
                    />
                </div>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.password &&
                    this.props.auth.error.password.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <input
                    type="password"
                    className="text-input"
                    name="password"
                    placeholder={`Password (At least ${this.props.minPasswordLength} characters)`}
                />
                <input
                    type="password"
                    className="text-input"
                    name="passwordConfirmation"
                    placeholder="Password Confirmation"
                />
                <br />
                <div>
                    <button className="button">Sign Up</button>
                </div>
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
