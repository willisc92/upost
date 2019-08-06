import React from "react";
import { startActivation } from "../../actions/activate";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import ButtonBase from "@material-ui/core/ButtonBase";

class AccountActivationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: true,
            isValid: undefined,
            loginOpen: false,
            error: undefined
        };
    }

    handleLoginModalOpen = () => {
        this.setState(() => {
            return { loginOpen: true };
        });
    };

    handleLoginModalClose = () => {
        this.setState(() => {
            return { loginOpen: false };
        });
    };

    handleSignupModalOpen = () => {
        this.setState(() => {
            return { signupOpen: true };
        });
    };

    handleSignupModalClose = () => {
        this.setState(() => {
            return { signupOpen: false };
        });
        this.props.history.push("/");
    };

    closeLoginOpenSignupModal = () => {
        this.handleLoginModalClose();
        this.handleSignupModalOpen();
    };

    closeSignupOpenLoginModal = () => {
        this.handleSignupModalClose();
        this.handleLoginModalOpen();
    };

    handleSucessfulLogin = () => {
        this.handleLoginModalClose();
        this.props.history.push("/interests");
    };

    handleSuccessfulSignUp = () => {
        this.handleSignupModalClose();
        this.props.history.push("/");
    };

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
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        {this.state.inProgress ? (
                            <Box paddingBottom={2}>
                                {" "}
                                <Typography variant="h1" gutterBottom>
                                    {" "}
                                    Your{" "}
                                    <Typography variant="inherit" display="inline" color="primary">
                                        UPost
                                    </Typography>{" "}
                                    account is currently being activated!{" "}
                                </Typography>{" "}
                            </Box>
                        ) : this.state.isValid ? (
                            <Box paddingBottom={2}>
                                <Typography variant="h3">Thank you for your email confirmation.</Typography>
                                <Typography variant="h6" gutterBottom>
                                    {" "}
                                    Please{" "}
                                    <Typography variant="inherit" display="inline" color="primary">
                                        <ButtonBase onClick={this.handleLoginModalOpen}>LOGIN </ButtonBase>
                                    </Typography>{" "}
                                    and select your interests and communities you want to be part of to complete your
                                    registration!{" "}
                                </Typography>
                            </Box>
                        ) : (
                            <Box paddingBottom={2}>
                                <Typography variant="h3" gutterBottom>
                                    {" "}
                                    The activation link is invalid{" "}
                                </Typography>
                            </Box>
                        )}
                    </Container>
                </Box>
                <SignupModal
                    signupOpen={this.state.signupOpen}
                    handleSignupClose={this.handleSignupModalClose}
                    pageMove={this.moveToInterestPage}
                    closeSignupOpenLoginModal={this.closeSignupOpenLoginModal}
                    handleSuccessfulSignUp={this.handleSuccessfulSignUp}
                />
                <LoginModal
                    loginOpen={this.state.loginOpen}
                    handleLoginClose={this.handleLoginModalClose}
                    closeLoginOpenSignupModal={this.closeLoginOpenSignupModal}
                    handleSucessfulLogin={this.handleSucessfulLogin}
                />
            </React.Fragment>
        );
    }
}

export default AccountActivationPage;
