import React from "react";
import ChannelForm from "../forms/ChannelForm";
import { connect } from "react-redux";
import { addChannel } from "../../actions/channels";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CustomStepper from "../CustomStepper";

export const AddChannelPage = (props) => {
    const onSubmit = (channel) => {
        props
            .addChannel(channel)
            .then(() => {
                goBack();
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    const goBack = () => {
        props.history.push("/myChannels");
    };

    const steps = [{ label: "Bulletin Boards", onClick: goBack }, { label: "Create a Bulletin Board", onClick: null }];

    return (
        <React.Fragment>
            <Box bgcolor="secondary.main" py={3}>
                <Container fixed>
                    <Typography variant="h1" color="primary" gutterBottom>
                        Create a Bulletin Board
                    </Typography>
                    <CustomStepper activeStep={1} steps={steps} />
                    <Button color="primary" variant="contained" onClick={goBack}>
                        Go Back
                    </Button>
                </Container>
            </Box>
            <Container fixed>
                <Box py={3}>
                    <ChannelForm onSubmit={onSubmit} />
                </Box>
            </Container>
        </React.Fragment>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addChannel: (channel) => dispatch(addChannel(channel))
});

export default connect(
    null,
    mapDispatchToProps
)(AddChannelPage);
