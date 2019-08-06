import React from "react";
import PasswordForm from "../forms/PasswordForm";
import { passwordResetConfirm } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

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
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        {this.state.inProgress ? (
                            <Typography variant="h1" gutterBottom>
                                Enter a new password for your{" "}
                                <Typography variant="h1" component="span" color="primary">
                                    UPost
                                </Typography>{" "}
                                Account.
                            </Typography>
                        ) : this.state.isValid ? (
                            <Typography variant="h1" gutterBottom>
                                Your password has now been reset. You can now proceed to login.
                            </Typography>
                        ) : (
                            <Typography variant="h1" gutterBottom>
                                An invalid request was made.
                            </Typography>
                        )}
                    </Container>
                </Box>
                <Container fixed>
                    {this.state.inProgress ? (
                        <React.Fragment>
                            <PasswordForm
                                onSubmit={this.passwordFormSubmit}
                                error={this.state.error}
                                minPasswordLength={this.state.minPasswordLength}
                                id="password"
                            />
                            <Button color="primary" variant="contained" type="submit" form="password">
                                Submit
                            </Button>
                        </React.Fragment>
                    ) : (
                        <br />
                    )}
                </Container>
            </React.Fragment>
        );
    }
}

export default PasswordResetPage;
