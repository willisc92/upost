import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const ContactUsPage = () => {
    return (
        <React.Fragment>
            <Box bgcolor="secondary.main" py={3}>
                <Container maxWidth="md">
                    <Typography variant="h1" gutterBottom>
                        Contacting{" "}
                        <Typography variant="h1" color="primary" component="span">
                            UPost
                        </Typography>
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="md">
                <Box marginTop={2}>
                    <Typography variant="h2" gutterBottom>
                        Questions and Concerns
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        Email
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Please feel free to email us directly at: support@upostwebsite.com
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="h2" gutterBottom>
                        Feedback and Suggestions
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        Email
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Please feel free to email us directly at: feedback@upostwebsite.com
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default ContactUsPage;
