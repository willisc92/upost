import React from "react";
import ChannelForm from "../forms/ChannelForm";
import { connect } from "react-redux";
import { editChannel, startGetChannel } from "../../actions/channels";
import { getCurrentUser } from "../../actions/auth";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export class EditChannelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const channel_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetChannel(channel_id)
                    .then((channel_res) => {
                        if (res.data.username !== channel_res.data[0].user) {
                            this.props.history.push("/myChannels");
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

    onSubmit = (channel) => {
        this.props
            .editChannel(this.props.match.params.id, channel)
            .then(() => this.props.history.push("/myChannels"))
            .catch(() => {});
    };

    goBack = () => {
        const channel = this.props.match.params.id;
        this.props.history.push(`/myChannels/${channel}`);
    };

    restore = () => {
        const channel = this.props.match.params.id;
        this.props.restoreChannel(channel).then(() => {
            this.props
                .startGetChannel(channel)
                .then(() => {})
                .catch((err) => {
                    console.log(JSON.stringify(err, null, 2));
                });
        });
    };

    render() {
        const read_only = this.props.channel && this.props.channel.deleted_flag;

        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        <Typography variant="h1" color="primary" gutterBottom>
                            Edit Channel
                        </Typography>
                        {read_only && (
                            <Typography variant="h2" color="error" gutterBottom>
                                You must restore this Channel before editing.
                            </Typography>
                        )}
                        <Button color="primary" variant="contained" onClick={this.goBack}>
                            Go Back
                        </Button>
                    </Container>
                </Box>
                <Container fixed>
                    <Box py={3}>
                        <ChannelForm onSubmit={this.onSubmit} channel={this.props.channel} read_only={read_only} />
                    </Box>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    channel: state.channels.channels[0],
    loading: state.channels.loading
});

const mapDispatchToProps = (dispatch) => ({
    editChannel: (id, channel) => dispatch(editChannel(id, channel)),
    startGetChannel: (id) => dispatch(startGetChannel(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditChannelPage);
