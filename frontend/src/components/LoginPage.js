import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (!!newProps.token) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Login</h1>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});

export default connect(mapStateToProps)(LoginPage);
