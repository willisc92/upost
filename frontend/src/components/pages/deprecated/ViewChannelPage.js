import React from "react";
import { connect } from "react-redux";
import { startGetChannel } from "../../../actions/channels";
import MyPostSummary from "../../MyPostSummary";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../../actions/subscriptions";

class ViewChannelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    componentDidMount() {
        const channel_id = parseInt(this.props.match.params.id);

        // check to see if channel is provided
        if (!!this.props.channel && channel_id === this.props.channel.channel_id) {
            // pass
        } else {
            this.props.startGetChannel(channel_id);
        }

        // check to see if subscriptions is provided
        if (!this.props.subscriptions) {
            this.props.startGetSubscriptions();
        }
    }

    updateSubscriptions = () => {
        this.props.startUpdateSubscriptions(this.props.channel.channel_id);
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    {!!this.props.channel && (
                        <div className="content-container">
                            <div className="header__box">
                                <h1 className="page-header__title">
                                    Channel <span>{this.props.channel.channel_name}</span>
                                </h1>
                                {!!this.props.subscriptions && (
                                    <button className="button" onClick={this.updateSubscriptions}>
                                        {this.props.subscriptions.includes(this.props.channel.channel_id)
                                            ? "Unsubscribe"
                                            : "Subscribe"}
                                    </button>
                                )}
                            </div>
                            <p>{this.props.channel.channel_description}</p>
                        </div>
                    )}
                </div>
                <div className="content-container">
                    {!!this.props.channel &&
                        this.props.channel.channel_posts
                            .filter((post) => {
                                return !post.deleted_flag;
                            })
                            .map((post) => {
                                return (
                                    <MyPostSummary
                                        post={post}
                                        pathName={`/post/${post.post_id}`}
                                        selected={this.state.selected}
                                    />
                                );
                            })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    channel: state.channels.channels[0],
    subscriptions: state.subscriptions.subscriptions
});

const mapDispatchToProps = (dispatch) => ({
    startGetChannel: (id) => dispatch(startGetChannel(id)),
    startGetSubscriptions: () => dispatch(startGetSubscriptions()),
    startUpdateSubscriptions: (id) => dispatch(startUpdateSubscriptions(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewChannelPage);
