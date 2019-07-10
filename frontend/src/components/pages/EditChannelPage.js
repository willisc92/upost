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
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Channel</h1>
                        {read_only && (
                            <div>
                                <h2 className="page-header__subtitle__red">
                                    You must restore this Channel before editing.
                                </h2>
                            </div>
                        )}
                        <button className="button" onClick={this.goBack}>
                            Go Back
                        </button>{" "}
                    </div>
                </div>
                <div className="content-container">
                    <ChannelForm onSubmit={this.onSubmit} channel={this.props.channel} read_only={read_only} />
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
