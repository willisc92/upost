import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const PrivacyPolicyPage = () => {
    return (
        <React.Fragment>
            <Box bgcolor="secondary.main" py={3}>
                <Container maxWidth="md">
                    <Typography variant="h1" gutterBottom>
                        <Typography variant="h1" color="primary" component="span">
                            UPost{" "}
                        </Typography>
                        Privacy Policy
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="md">
                <Box marginTop={2}>
                    <Typography variant="body1" gutterBottom>
                        Your privacy is important to us. It is UPost's policy to respect your privacy regarding any
                        information we may collect from you across our website, https://www.upostwebsite.com, and other
                        sites we own and operate.
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1" gutterBottom>
                        We only ask for personal information when we truly need it to provide a service to you. We
                        collect it by fair and lawful means, with your knowledge and consent. We also let you know why
                        we’re collecting it and how it will be used.
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1" gutterBottom>
                        We only retain collected information for as long as necessary to provide you with your requested
                        service. What data we store, we’ll protect within commercially acceptable means to prevent loss
                        and theft, as well as unauthorised access, disclosure, copying, use or modification.
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1" gutterBottom>
                        We don’t share any personally identifying information publicly or with third-parties, except
                        when required to by law.
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1" gutterBottom>
                        Our website may link to external sites that are not operated by us. Please be aware that we have
                        no control over the content and practices of these sites, and cannot accept responsibility or
                        liability for their respective privacy policies.
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1" gutterBottom>
                        You are free to refuse our request for your personal information, with the understanding that we
                        may be unable to provide you with some of your desired services.
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1" gutterBottom>
                        Your continued use of our website will be regarded as acceptance of our practices around privacy
                        and personal information. If you have any questions about how we handle user data and personal
                        information, feel free to contact us.
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1" gutterBottom>
                        This policy is effective as of 9 August 2019.
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default PrivacyPolicyPage;
