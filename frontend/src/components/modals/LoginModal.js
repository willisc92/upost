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

    componentWillMount() {
        Modal.setAppElement("body");
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
                    <img className="modal__logo" src={CDNLink + "/dist/images/logo.png"} />
                    <div>
                        <p className="modal__header__label">Login to Your U-post Account</p>
                        <p className="modal__header__sublabel">to continue</p>
                    </div>
                </div>
                <LoginForm onSubmit={this.loginOnSubmit} id="login" />
                <div className="modal__buttons">
                    <button className="button modal__button" type="submit" form="login">
                        Login
                    </button>
                    <button className="button" onClick={this.props.closeLoginOpenSignupModal}>
                        Create Account
                    </button>
                </div>
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
