import React from "react";
import { connect } from "react-redux";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

export class AccountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maxDate: moment(),
            minDate: moment().subtract(110, "year"),
            birthDate: moment().subtract(25, "year"),
            error: undefined
        };
    }

    onDateChange = (date) => {
        if (!!date) {
            this.setState({
                birthDate: date
            });
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            formInput: e.target,
            birthDate: this.state.birthDate.toDate()
        });
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.username &&
                    this.props.auth.error.username.map((error) => {
                        return (
                            <Typography color="error" variant="body1" key={error} gutterBottom>
                                {error}
                            </Typography>
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
                            <Typography color="error" variant="body1" key={error} gutterBottom>
                                {error}
                            </Typography>
                        );
                    })}
                <Box bgcolor="white">
                    <TextField
                        required
                        name="email"
                        required
                        label="Email"
                        fullWidth={true}
                        color="primary"
                        variant="outlined"
                    />
                </Box>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.first_name &&
                    this.props.auth.error.first_name.map((error) => {
                        return (
                            <Typography color="error" variant="body1" key={error} gutterBottom>
                                {error}
                            </Typography>
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
                            <Typography color="error" variant="body1" key={error} gutterBottom>
                                {error}
                            </Typography>
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
                            <Typography color="error" variant="body1" key={error} gutterBottom>
                                {error}
                            </Typography>
                        );
                    })}
                <div>
                    <span className="modal__label">Birth Date</span>
                    <KeyboardDatePicker
                        value={this.state.birthDate.format("YYYY-MM-DD")}
                        placeholder="YYYY-MM-DD"
                        onChange={this.onDateChange}
                        maxDate={this.state.maxDate}
                        minDate={this.state.minDate}
                        format="YYYY-MM-DD"
                    />
                </div>
                {!!this.props.auth.error &&
                    !!this.props.auth.error.password &&
                    this.props.auth.error.password.map((error) => {
                        return (
                            <Typography color="error" variant="body1" key={error} gutterBottom>
                                {error}
                            </Typography>
                        );
                    })}
                <Box bgcolor="white">
                    <TextField
                        required
                        type="password"
                        label={`Password (At least ${this.props.minPasswordLength} characters)`}
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
