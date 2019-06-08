import React from "react";
import { startGetChannel } from "../../actions/channels";
import { connect } from "react-redux";
import moment from "moment";
import MyPostSummary from "../MyPostSummary";
import MyChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";
import { getVisiblePosts } from "../../selectors/myPosts";

class MyChannelDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const channel_id = this.props.match.params.id;
        this.props
            .startGetChannel(channel_id)
            .then(() => {
                if (this.props.channel.user !== localStorage.getItem("user_name")) {
                    this.props.history.push("/myChannels");
                }
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

    handleAddPost = () => {
        const channel_id = this.props.match.params.id;
        this.props.history.push(`/myChannels/${channel_id}/addPost`);
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
                                <h2>Name: {this.props.channel.channel_name}</h2>
                                <h3>Description: {this.props.channel.channel_description}</h3>
                                <h3>
                                    Creation Date: {moment(this.props.channel.creation_date).format("MMMM Do YYYY")}
                                </h3>

                                <div>
                                    <button className="button button--secondary" onClick={this.handleAddPost}>
                                        Add a new post
                                    </button>
                                    <span> </span>
                                    <button
                                        id={this.props.channel.channel_id}
                                        className="button button--secondary"
                                        onClick={this.handleEditChannel}
                                    >
                                        Edit this channel
                                    </button>
                                </div>
                                <div className="page-header__actions">
                                    <MyChannelFilterSelector />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {this.props.posts !== [] && (
                    <div className="content-container">
                        <div className="list-body">
                            <div className="list-parent">
                                {this.props.length > 0 ? (
                                    this.props.posts.map((post) => {
                                        return (
                                            <div key={post.post_id} className="list-box">
                                                <MyPostSummary post={post} />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p> No posts </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.postFilters,
        channel: state.channels.channels.length === 1 && state.channels.channels[0],
        length:
            state.channels.channels.length === 1
                ? getVisiblePosts(state.channels.channels[0].channel_posts, state.channelFilters).length
                : 0,
        loading: state.channels.loading,
        posts:
            state.channels.channels.length === 1
                ? getVisiblePosts(state.channels.channels[0].channel_posts, state.channelFilters)
                : []
    };
};

const mapDispatchToProps = (dispatch) => ({
    startGetChannel: (id) => dispatch(startGetChannel(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelDetail);
