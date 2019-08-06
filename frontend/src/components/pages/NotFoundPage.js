import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ButtonBase from "@material-ui/core/ButtonBase";

const NotFoundPage = (props) => (
    <Box bgcolor="secondary.main" py={3}>
        <Container maxWidth="xl">
            <Typography variant="h1" color="error">
                404 - Page Not Found -{" "}
                <Typography variant="inherit">
                    <ButtonBase
                        onClick={() => {
                            props.history.push("/");
                        }}
                    >
                        Go home
                    </ButtonBase>
                </Typography>
            </Typography>
        </Container>
    </Box>
);

export default NotFoundPage;
