import React from "react";
import ChannelForm from "../forms/ChannelForm";
import { connect } from "react-redux";
import { addChannel } from "../../actions/channels";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export class AddChannelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (channel) => {
        this.props
            .addChannel(channel)
            .then(() => this.props.history.push("/myChannels"))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    render() {
        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        <Typography variant="h1" color="primary">
                            Add a Channel
                        </Typography>
                    </Container>
                </Box>
                <Container fixed>
                    <Box>
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
