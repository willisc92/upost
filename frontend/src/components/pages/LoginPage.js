import React from "react";
import LoginForm from "../forms/LoginForm";
import { connect } from "react-redux";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token) {
            this.props.history.push("/");
        }
    }

    createAccount = () => {
        this.props.history.push("/signup");
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Login</h1>
                    </div>
                </div>
                <div className="content-container">
                    <LoginForm />
                    <button className="button" onClick={this.createAccount}>
                        Create Account
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: !!state.auth.token
});

export default connect(mapStateToProps)(LoginPage);
