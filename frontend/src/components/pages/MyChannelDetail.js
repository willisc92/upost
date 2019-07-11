import React from "react";
import { startGetChannel, deleteChannel, restoreChannel } from "../../actions/channels";
import { deletePost } from "../../actions/posts";
import { connect } from "react-redux";
import moment from "moment";
import { MyPostMenu } from "../MyPostSummary";
import MyPostFilterSelector from "../filter_selectors/PostFilterSelector";
import { getVisiblePosts } from "../../selectors/myPosts";
import { getCurrentUser } from "../../actions/auth";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";

export class MyChannelDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
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

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    handleAddPost = () => {
        const channel_id = this.props.match.params.id;
        this.props.history.push(`/myChannels/${channel_id}/addPost`);
    };

    handleEditChannel = (e) => {
        const channel_id = e.target.id;
        this.props.history.push(`/myChannels/edit/${channel_id}`);
    };

    restoreChannel = (e) => {
        const channel_id = this.props.match.params.id;
        this.props
            .restoreChannel(channel_id)
            .then(() => {
                this.props.history.push(`/myChannels/${channel_id}/`);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    deleteChannel = (e) => {
        const channel_id = this.props.match.params.id;
        this.props
            .deleteChannel(channel_id)
            .then(() => {
                this.props.history.push(`/myChannels/${channel_id}/`);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    deleteAllPosts = (e) => {
        let promises = [];
        const posts = this.props.posts;

        posts.forEach((post) => {
            promises.push(this.props.deletePost(post.post_id));
        });

        const channel_id = this.props.match.params.id;

        Promise.all(promises)
            .then(() => {
                this.props.startGetChannel(channel_id);
            })
            .catch((err) => {
                console.log(err);
                console.log(JSON.stringify(err, null, 2));
            });
    };

    render() {
        const menu =
            this.props.posts && MyPostMenu(this.props.posts, this.state.selected, this.props.channel.deleted_flag);

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Channel Page: <span>{this.props.channel.channel_name}</span>
                        </h1>
                        {this.props.loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                <h3>Description: {this.props.channel.channel_description}</h3>
                                <h3>
                                    Creation Date: {moment(this.props.channel.creation_date).format("MMMM Do YYYY")}
                                </h3>
                                {this.props.channel.deleted_flag && (
                                    <h3 className="page-header__subtitle__red">
                                        Deletion Date: {moment(this.props.channel.deletion_date).format("MMMM Do YYYY")}{" "}
                                        - Restore the Channel To Add/Edit Posts
                                    </h3>
                                )}

                                {this.props.channel.deleted_flag ? (
                                    <button className="button" onClick={this.restoreChannel}>
                                        Restore Channel
                                    </button>
                                ) : (
                                    <div>
                                        <button className="button" onClick={this.handleAddPost}>
                                            Add a new post
                                        </button>{" "}
                                        <button
                                            id={this.props.channel.channel_id}
                                            className="button"
                                            onClick={this.handleEditChannel}
                                        >
                                            Edit this channel
                                        </button>{" "}
                                        <button
                                            id={this.props.channel.channel_id}
                                            className="button"
                                            onClick={this.deleteChannel}
                                        >
                                            Delete this Channel
                                        </button>{" "}
                                        {!!menu && menu.length > 0 && (
                                            <button className="button" onClick={this.deleteAllPosts}>
                                                Delete All Posts
                                            </button>
                                        )}
                                    </div>
                                )}
                                <div className="page-header__actions">
                                    <MyPostFilterSelector />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {this.props.posts !== [] && (
                    <div className="content-container">
                        {this.props.posts.length > 0 ? (
                            <ScrollMenu
                                data={menu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                            />
                        ) : (
                            <p> No posts </p>
                        )}
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
        loading: state.channels.loading,
        posts:
            state.channels.channels.length === 1
                ? getVisiblePosts(
                      state.channels.channels[0].channel_posts,
                      state.postFilters,
                      state.channels.channels[0].deleted_flag
                  )
                : []
    };
};

const mapDispatchToProps = (dispatch) => ({
    startGetChannel: (id) => dispatch(startGetChannel(id)),
    deleteChannel: (id) => dispatch(deleteChannel(id)),
    restoreChannel: (id) => dispatch(restoreChannel(id)),
    deletePost: (id) => dispatch(deletePost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelDetail);
