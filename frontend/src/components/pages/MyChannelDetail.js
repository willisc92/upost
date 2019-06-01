import React from "react";
import { startGetChannel } from "../../actions/channels";
import { connect } from "react-redux";
import moment from "moment";

class MyChannelDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const channel_id = this.props.match.params.id;
        this.props.startGetChannel(channel_id);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.length === 1 && newProps.loading === false) {
            if (newProps.channel[0].user !== localStorage.getItem("user_name")) {
                this.props.history.push("/myChannels");
            }
        }
    }

    handleAddPost = () => {
        console.log("Handle add post called");
    };

    handleEditChannel = (e) => {
        const channel_id = e.target.id;
        this.props.history.push(`/myChannels/edit/${channel_id}`);
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Channel Page</h1>
                        {this.props.loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                {this.props.channel.map((channel) => (
                                    <div key={channel.channel_id}>
                                        <h2>Name: {channel.channel_name}</h2>
                                        <h3>Description: {channel.channel_description}</h3>
                                        <h3>Creation Date: {moment(channel.creation_date).format("MMMM Do YYYY")}</h3>

                                        <button className="button button--secondary" onClick={this.handleAddPost}>
                                            Add a new post
                                        </button>
                                        <span> </span>
                                        <button
                                            id={channel.channel_id}
                                            className="button button--secondary"
                                            onClick={this.handleEditChannel}
                                        >
                                            Edit this channel
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channel: state.channels.channels,
        length: state.channels.channels.length,
        loading: state.channels.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
    startGetChannel: (id) => dispatch(startGetChannel(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelDetail);
