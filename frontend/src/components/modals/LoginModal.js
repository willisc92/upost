import React from "react";
import Modal from "react-modal";
import LoginForm from "../forms/LoginForm";
import { connect } from "react-redux";
import { authFail, authLogin } from "../../actions/auth";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    loginOnSubmit = ({ username, password }) => {
        if (!username || !password) {
            this.props.authFail({ error: "Please provide both username and password" });
        } else {
            this.props.authFail({ error: "" });
            this.props
                .authLogin(username, password)
                .then(() => {
                    this.props.handleSucessfulLogin();
                })
                .catch((error) => {
                    console.log("And error has occured with Login", error);
                });
        }
    };

    render() {
        return (
            <Modal
                className="modal"
                isOpen={this.props.loginOpen}
                contentLabel="Login"
                onRequestClose={this.props.handleLoginClose}
                closeTimeoutMS={200}
            >
                <div className="modal__header">
                    <img className="modal__logo" src="dist/images/logo.png" />
                    <p className="modal__header__label">Create Your U-post Account</p>
                </div>
                <LoginForm onSubmit={this.loginOnSubmit} />
                <button className="button" onClick={this.props.closeLoginOpenSignupModal}>
                    Create Account
                </button>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    token: !!state.auth.token
});

const mapDispatchToProps = (dispatch) => {
    return {
        authFail: (error) => dispatch(authFail(error)),
        authLogin: (username, password) => dispatch(authLogin(username, password))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);
