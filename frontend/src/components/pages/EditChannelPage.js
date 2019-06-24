import React from "react";
import ChannelForm from "../forms/ChannelForm";
import { connect } from "react-redux";
import { editChannel, startGetChannel } from "../../actions/channels";
import { getCurrentUser } from "../../actions/auth";

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
