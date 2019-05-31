import React from "react";
import ChannelForm from "../forms/ChannelForm";
import { connect } from "react-redux";
import { addChannel } from "../../actions/channels";

class AddChannelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (!!newProps.token) {
            this.props.history.push("/myChannels");
        }
    }

    onSubmit = (channel) => {
        this.props.addChannel({ ...channel });
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

const mapStateToProps = (state) => ({
    token: !!state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    addChannel: (channel) => dispatch(addChannel(channel))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddChannelPage);
