import React from "react";
import { connect } from "react-redux";
import { authLogin } from "../../actions/auth";
import TextField from "@material-ui/core/TextField";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    onUserNameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username }));
    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({ username: this.state.username, password: this.state.password });
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.error && <p className="form__error">{this.props.error.error}</p>}
                <TextField
                    label="Username"
                    color="primary"
                    variant="outlined"
                    margin="normal"
                    autoFocus
                    value={this.state.username}
                    onChange={this.onUserNameChange}
                />
                <TextField
                    label="Password"
                    color="primary"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    authLogin: (username, password) => dispatch(authLogin(username, password))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
