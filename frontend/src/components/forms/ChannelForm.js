import React from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/auth";
import { Button } from "@material-ui/core/Button";
import { TextField } from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core/Typography";

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
            <form className="form" onSubmit={this.onSubmit}>
                {!!this.props.error && !!this.props.error.channel_name && (
                    <Typography color="error"> {this.props.error.channel_name[0]}</Typography>
                )}
                {this.state.error && <Typography color="error">{this.state.error}</Typography>}
                <div className="input-group__item">
                    <TextField
                        label="Name"
                        type="text"
                        placeholder="Name"
                        value={this.state.channel_name}
                        onChange={this.onNameChange}
                        disabled={this.props.read_only}
                        required
                    />
                </div>
                <div className="input-group__item">
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
                </div>
                <div>
                    {!this.props.read_only && (
                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>
                    )}
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: !!state.channels.error && state.channels.error.response.data
});

export default connect(mapStateToProps)(ChannelForm);
