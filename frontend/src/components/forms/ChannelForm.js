import React from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/auth";

export class ChannelForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channel_name: this.props.channel ? this.props.channel.channel_name : "",
            deleted_flag: this.props.channel ? this.props.channel.deleted_flag : false,
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

    onDeletedFlagChange = (e) => {
        this.setState((prevState) => ({ deleted_flag: !prevState.deleted_flag }));
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
                    deleted_flag: this.state.deleted_flag,
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
                    <p className="form_error"> {this.props.error.channel_name[0]}</p>
                )}
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <div className="input-group__item">
                    Channel Name:{" "}
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Name"
                        autoFocus
                        value={this.state.channel_name}
                        onChange={this.onNameChange}
                    />
                </div>
                <div className="input-group__item">
                    Channel Description:{" "}
                    <textarea
                        className="text-input"
                        type="text"
                        placeholder="Description"
                        value={this.state.channel_description}
                        onChange={this.onDescriptionChange}
                    />
                </div>
                <div className="input-group__item">
                    <p>
                        Visible <span />
                        <span>
                            <input
                                type="checkbox"
                                name="prop1"
                                id="string"
                                checked={!this.state.deleted_flag}
                                onChange={this.onDeletedFlagChange}
                            />
                        </span>
                    </p>
                </div>
                <div>
                    <button className="button">Submit</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: !!state.channels.error && state.channels.error.response.data
});

export default connect(mapStateToProps)(ChannelForm);
