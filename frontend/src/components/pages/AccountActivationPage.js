import React from "react";
import { startActivation } from "../../actions/activate";

class AccountActivationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: true,
            isValid: undefined
        };
    }

    componentDidMount() {
        const uid = this.props.match.params.uid;
        const token = this.props.match.params.token;
        startActivation(uid, token)
            .then((result) => {
                this.setState(() => {
                    return { inProgress: false, isValid: true };
                });
            })
            .catch((error) => {
                console.log("error", JSON.stringify(error, null, 2));
                this.setState(() => {
                    return { inProgress: false, isValid: false };
                });
            });
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        {this.state.inProgress ? (
                            <h1 className="page-header__title">
                                Your <span>UPost</span> account is currently being activated!
                            </h1>
                        ) : this.state.isValid ? (
                            <h1 className="page-header__title">
                                Thank you for your email confirmation. Please login and complete your registration.
                            </h1>
                        ) : (
                            <h1 className="page-header__title">The activation link is invalid</h1>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountActivationPage;
