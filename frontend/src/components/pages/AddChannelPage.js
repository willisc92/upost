import React from "react";
import ChannelForm from "../forms/ChannelForm";
import { connect } from "react-redux";
import { addChannel } from "../../actions/channels";

class AddChannelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (channel) => {
        this.props
            .addChannel({ ...channel })
            .then(() => this.props.history.push("/myChannels"))
            .catch(() => {});
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add a Channel</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ChannelForm onSubmit={this.onSubmit} />
                </div>
            </div>
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
