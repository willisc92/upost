import React from "react";

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
                {!!this.props.error && <p className="form__error">{this.props.error}</p>}
                <input
                    type="password"
                    className="text-input"
                    name="password"
                    placeholder={`Password* (At least ${this.props.minPasswordLength} characters)`}
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />
                <input
                    type="password"
                    className="text-input"
                    name="passwordConfirmation"
                    placeholder="Password Confirmation*"
                    value={this.state.confirm}
                    onChange={this.onConfirmChange}
                />
            </form>
        );
    }
}

export default PasswordForm;
