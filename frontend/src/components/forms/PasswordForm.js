import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

class PasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            confirm: ""
        };
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    };

    onConfirmChange = (e) => {
        const confirm = e.target.value;
        this.setState(() => ({ confirm }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({ password: this.state.password, confirm: this.state.confirm });
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.error && (
                    <Typography color="error" variant="body1">
                        {this.props.error}
                    </Typography>
                )}
                <Box bgcolor="white" marginTop={2}>
                    <TextField
                        required
                        variant="outlined"
                        type="password"
                        color="primary"
                        label={`Password (At least ${this.props.minPasswordLength} characters)`}
                        name="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        fullWidth={true}
                    />
                </Box>
                <Box bgcolor="white" marginTop={2}>
                    <TextField
                        required
                        type="password"
                        variant="outlined"
                        color="primary"
                        name="passwordConfirmation"
                        label="Password Confirmation*"
                        value={this.state.confirm}
                        onChange={this.onConfirmChange}
                        fullWidth={true}
                    />
                </Box>
            </form>
        );
    }
}

export default PasswordForm;
