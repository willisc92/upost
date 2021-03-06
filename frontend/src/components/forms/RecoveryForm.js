import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ""
        };
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({ email: this.state.email });
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.error && (
                    <Typography variant="body1" color="error" gutterBottom>
                        {this.props.error.error}
                    </Typography>
                )}
                <Box bgcolor="white">
                    <TextField
                        label="Email"
                        color="primary"
                        variant="outlined"
                        fullWidth={true}
                        autoFocus
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                </Box>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
