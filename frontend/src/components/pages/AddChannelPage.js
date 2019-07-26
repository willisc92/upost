import React from "react";
import ChannelForm from "../forms/ChannelForm";
import { connect } from "react-redux";
import { addChannel } from "../../actions/channels";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export class AddChannelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (channel) => {
        this.props
            .addChannel(channel)
            .then(() => this.goBack())
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    goBack = () => {
        this.props.history.push("/myChannels");
    };

    render() {
        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        <Typography variant="h1" color="primary" gutterBottom>
                            Add a Channel
                        </Typography>
                        <Button color="primary" variant="contained" onClick={this.goBack}>
                            Go Back
                        </Button>
                    </Container>
                </Box>
                <Container fixed>
                    <Box py={3}>
                        <ChannelForm onSubmit={this.onSubmit} />
                    </Box>
                </Container>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addChannel: (channel) => dispatch(addChannel(channel))
});

export default connect(
    null,
    mapDispatchToProps
)(AddChannelPage);
