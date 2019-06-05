import React from "react";
import ChannelForm from "../forms/ChannelForm";
import { connect } from "react-redux";
import { editChannel, startGetChannel } from "../../actions/channels";

class EditChannelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const channel_id = this.props.match.params.id;
        this.props.startGetChannel(channel_id);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.length === 1 && newProps.loading === false) {
            if (newProps.channel.user !== localStorage.getItem("user_name")) {
                this.props.history.push("/myChannels");
            }
        }
    }

    onSubmit = (channel) => {
        this.props
            .editChannel(this.props.match.params.id, channel)
            .then(() => this.props.history.push("/myChannels"))
            .catch(() => {});
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Channel</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ChannelForm onSubmit={this.onSubmit} channel={this.props.channel} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: !!state.auth.token,
    channel: state.channels.channels[0],
    length: state.channels.channels.length,
    loading: state.channels.loading,
    error: state.channels.error
});

const mapDispatchToProps = (dispatch) => ({
    editChannel: (id, channel) => dispatch(editChannel(id, channel)),
    startGetChannel: (id) => dispatch(startGetChannel(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditChannelPage);