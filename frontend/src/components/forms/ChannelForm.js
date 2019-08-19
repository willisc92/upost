import React from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";

export class ChannelForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channel_name: this.props.channel ? this.props.channel.channel_name : "",
            channel_description: this.props.channel ? this.props.channel.channel_description : "",
            error: "",
            picture: this.props.channel ? this.props.channel.picture : null,
            orig_picture: this.props.channel ? this.props.channel.picture : null,
            picture_preview: this.props.channel ? this.props.channel.picture : null
        };
    }

    onNameChange = (e) => {
        const channel_name = e.target.value;
        if (!!channel_name) {
            if (channel_name.length > 50) {
                this.setState({ error: "Must have a bulletin board name of 50 character length or less" });
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
                this.setState({ error: "Must have a bulletin board description 500 characters or less" });
            } else {
                this.setState(() => ({ channel_description }));
            }
        } else {
            this.setState(() => ({ channel_description }));
        }
    };

    handleImageChange = async (e) => {
        await this.setState({
            picture: e.target.files[0],
            picture_preview: URL.createObjectURL(e.target.files[0])
        });
    };

    clearPicture = () => {
        this.setState({
            picture: null,
            picture_preview: null
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.channel_name) {
            this.setState(() => ({ error: "Please provide a bulletin board name" }));
        } else {
            getCurrentUser().then((res) => {
                this.setState(() => ({ error: "" }));
                // Checks if the picture was changed on load (for edit requests).
                const picture_changed = this.state.orig_picture !== this.state.picture;
                // If there is a picture...
                if (!!this.state.picture) {
                    let form_data = new FormData();
                    // If the picture changed from the existing one - submit as form data.
                    if (picture_changed) {
                        form_data.append("picture", this.state.picture);
                        form_data.append("user", res.data.username);
                        form_data.append("channel_name", this.state.channel_name);
                        form_data.append("channel_description", this.state.channel_description);
                        this.props.onSubmit(form_data);
                    } else {
                        let payload = {
                            user: res.data.username,
                            channel_name: this.state.channel_name,
                            channel_description: this.state.channel_description
                        };
                        this.props.onSubmit(payload);
                    }
                } else {
                    this.props.onSubmit({
                        user: res.data.username,
                        channel_name: this.state.channel_name,
                        channel_description: this.state.channel_description
                    });
                }
            });
        }
    };

    render() {
        return (
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

                <Box>
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
                <Box>
                    <TextField
                        label="Description"
                        type="text"
                        placeholder="Description"
                        value={this.state.channel_description}
                        onChange={this.onDescriptionChange}
                        disabled={this.props.read_only}
                        multiline
                    />
                </Box>
                <Box>
                    <Box paddingRight={2}>
                        <Typography display="inline">Image upload: </Typography>
                        {!this.state.picture_preview && (
                            <Typography display="inline" color="error">
                                No image uploaded
                            </Typography>
                        )}
                    </Box>
                    {!!this.state.picture_preview && (
                        <React.Fragment>
                            <Box>
                                <img className="post_image" src={this.state.picture_preview} />
                            </Box>
                            <Button
                                onClick={this.clearPicture}
                                disabled={this.props.read_only}
                                color="primary"
                                variant="contained"
                            >
                                Clear Picture
                            </Button>
                        </React.Fragment>
                    )}
                </Box>
                <Box>
                    <Input
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        onChange={this.handleImageChange}
                        disableUnderline
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
        );
    }
}

const mapStateToProps = (state) => ({
    error: !!state.channels.error && state.channels.error.response.data
});

export default connect(mapStateToProps)(ChannelForm);
