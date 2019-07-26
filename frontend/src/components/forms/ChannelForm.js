import React from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export class ChannelForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channel_name: this.props.channel ? this.props.channel.channel_name : "",
            channel_description: this.props.channel ? this.props.channel.channel_description : "",
            error: ""
        };
    }

    onNameChange = (e) => {
        const channel_name = e.target.value;
        if (!!channel_name) {
            if (channel_name.length > 50) {
                this.setState({ error: "Must have a channel name 50 characters or less" });
            } else {
                this.setState(() => ({ channel_name }));
            }
        } else {
            this.setState(() => ({ channel_name }));
        }
    };

    onDescriptionChange = (e) => {
        const channel_description = e.target.value;
        if (!!channel_description) {
            if (channel_description.length > 500) {
                this.setState({ error: "Must have a channel description 500 characters or less" });
            } else {
                this.setState(() => ({ channel_description }));
            }
        } else {
            this.setState(() => ({ channel_description }));
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.channel_name) {
            this.setState(() => ({ error: "Please provide a channel name" }));
        } else {
            getCurrentUser().then((res) => {
                this.setState(() => ({ error: "" }));
                this.props.onSubmit({
                    channel_name: this.state.channel_name,
                    channel_description: this.state.channel_description,
                    user: res.data.username
                });
            });
        }
    };

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    {!!this.props.error && !!this.props.error.channel_name && (
                        <Box paddingBottom={3}>
                            <Typography color="error" variant="h2">
                                {this.props.error.channel_name[0]}
                            </Typography>
                        </Box>
                    )}
                    {this.state.error && (
                        <Box paddingBottom={3}>
                            <Typography color="error" variant="h2">
                                {this.state.error}
                            </Typography>
                        </Box>
                    )}

                    <Box py={2}>
                        <TextField
                            label="Name"
                            type="text"
                            placeholder="Name"
                            value={this.state.channel_name}
                            onChange={this.onNameChange}
                            disabled={this.props.read_only}
                            required
                        />
                    </Box>
                    <Box py={2}>
                        <TextField
                            label="Description"
                            className="text-input"
                            type="text"
                            placeholder="Description"
                            value={this.state.channel_description}
                            onChange={this.onDescriptionChange}
                            disabled={this.props.read_only}
                            multiline
                        />
                    </Box>
                    {!this.props.read_only && (
                        <Box>
                            <Button color="primary" variant="contained" type="submit">
                                Submit
                            </Button>
                        </Box>
                    )}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: !!state.channels.error && state.channels.error.response.data
});

export default connect(mapStateToProps)(ChannelForm);
