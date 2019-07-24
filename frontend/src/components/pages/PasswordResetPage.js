import React from "react";
import PasswordForm from "../forms/PasswordForm";
import { passwordResetConfirm } from "../../actions/auth";

class PasswordResetPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: true,
            isValid: undefined,
            error: "",
            minPasswordLength: 8
        };
    }

    passwordFormSubmit = ({ password, confirm }) => {
        if (password !== confirm) {
            this.setState(() => {
                return { error: "Passwords do not match." };
            });
        } else if (password.length < this.state.minPasswordLength) {
            this.setState(() => {
                return { error: "Password does not meet minimum length." };
            });
        } else {
            this.setState(() => {
                return { error: "" };
            });
            const token = this.props.match.params.token;
            passwordResetConfirm(token, password)
                .then(() => {
                    this.setState(() => {
                        return { inProgress: false, isValid: true };
                    });
                })
                .catch((error) => {
                    console.log(JSON.stringify(error, null, 2));
                    this.setState(() => {
                        return { inProgress: false, isValid: false };
                    });
                });
        }
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        {this.state.inProgress ? (
                            <h1 className="page-header__title">
                                Enter a new password for your <span>UPost</span> Account.
                            </h1>
                        ) : this.state.isValid ? (
                            <h1 className="page-header__title">
                                Your password has now been reset. You can now proceed to login.
                            </h1>
                        ) : (
                            <h1 className="page-header__title">An invalid request was made.</h1>
                        )}
                    </div>
                </div>
                <div className="content-container">
                    {this.state.inProgress ? (
                        <div>
                            <PasswordForm
                                onSubmit={this.passwordFormSubmit}
                                error={this.state.error}
                                minPasswordLength={this.state.minPasswordLength}
                                id="password"
                            />
                            <button className="button" type="submit" form="password">
                                Submit
                            </button>
                        </div>
                    ) : (
                        <br />
                    )}
                </div>
            </div>
        );
    }
}

export default PasswordResetPage;
