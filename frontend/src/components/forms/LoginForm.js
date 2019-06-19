import React from "react";
import { connect } from "react-redux";
import { authLogin } from "../../actions/auth";

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
            <form className="form" onSubmit={this.onSubmit}>
                {!!this.props.error && <p className="form__error">Request failed.</p>}
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
                <div className="modal__button">
                    <button className="button">Login</button>
                </div>
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
