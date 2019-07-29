import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-date-picker";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export class AccountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maxDate: new Date(),
            minDate: new Date(1900, 1, 1),
            birthDate: null,
            error: undefined
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

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            formInput: e.target,
            birthDate: this.state.birthDate
        });
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.username &&
                    this.props.auth.error.username.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <Box bgcolor="white">
                    <TextField
                        required
                        label="Username (150 characters or fewer)"
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                        autoFocus
                        name="username"
                    />
                </Box>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.email &&
                    this.props.auth.error.email.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <Box bgcolor="white">
                    <TextField
                        required
                        name="email"
                        required
                        label="Email*"
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                    />
                </Box>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.first_name &&
                    this.props.auth.error.first_name.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <Box bgcolor="white">
                    <TextField
                        required
                        label="First Name"
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                        name="firstName"
                    />
                </Box>
                <Box bgcolor="white">
                    <TextField
                        label="Middle Name"
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                        name="middleName"
                    />
                </Box>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.last_name &&
                    this.props.auth.error.last_name.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
                <Box bgcolor="white">
                    <TextField
                        required
                        label="Last Name"
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                        name="lastName"
                    />
                </Box>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.birth_date &&
                    this.props.auth.error.birth_date.map((error) => {
                        return (
                            <p className="form__error" key={error}>
                                {error}
                            </p>
                        );
                    })}
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
                <Box bgcolor="white">
                    <TextField
                        required
                        type="password"
                        label={`Password (At least ${this.props.minPasswordLength}) characters)`}
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                        name="password"
                    />
                </Box>
                <Box bgcolor="white">
                    <TextField
                        required
                        type="password"
                        label="Password Confirmation"
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                        name="passwordConfirmation"
                    />
                </Box>
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
