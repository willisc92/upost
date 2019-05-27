import React from "react";
import { connect } from "react-redux";
import { authLogin } from "../actions/auth";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: ""
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

    onSubmit = async (e) => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            this.setState(() => ({ error: "Please provide both username and password" }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.authLogin(this.state.username, this.state.password);
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {!!this.props.error && <p className="form__error">{this.props.error}</p>}
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    className="text-input"
                    type="text"
                    placeholder="Username"
                    autoFocus
                    value={this.state.username}
                    onChange={this.onUserNameChange}
                />
                <input
                    className="text-input"
                    type="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                    placeholder="Password"
                />
                <div>
                    <button className="button">Login</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
    authLogin: (username, password) => dispatch(authLogin(username, password))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
