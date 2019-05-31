import React from "react";
import { connect } from "react-redux";

class ChannelForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channel_name: "",
            deleted_flag: false,
            channel_description: "",
            error: ""
        };
    }

    onNameChange = (e) => {
        const channel_name = e.target.value;
        this.setState(() => ({ channel_name }));
    };

    onDeletedFlagChange = (e) => {
        this.setState((prevState) => ({ deleted_flag: !prevState.deleted_flag }));
        console.log(this.state.deleted_flag);
    };

    onDescriptionChange = (e) => {
        const channel_description = e.target.value;
        this.setState(() => ({ channel_description }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.channel_name) {
            this.setState(() => ({ error: "Please provide a channel name" }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.onSubmit({
                channel_name: this.state.channel_name,
                deleted_flag: this.state.deleted_flag,
                channel_description: this.state.channel_description
            });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {!!this.props.error && <p className="form__error">Request failed.</p>}
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    className="text-input"
                    type="text"
                    placeholder="Channel Name"
                    autoFocus
                    value={this.state.channel_name}
                    onChange={this.onNameChange}
                />
                <input
                    className="text-input"
                    type="text"
                    placeholder="Description"
                    value={this.state.channel_description}
                    onChange={this.onDescriptionChange}
                />
                <p>
                    Visible <span />
                    <span>
                        <input
                            type="checkbox"
                            name="prop1"
                            id="string"
                            checked={this.state.deleted_flag}
                            onChange={this.onDeletedFlagChange}
                        />
                    </span>
                </p>
                <div>
                    <button className="button">Submit</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});

export default connect(mapStateToProps)(ChannelForm);
