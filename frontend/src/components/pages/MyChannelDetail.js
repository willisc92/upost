import React from "react";
import { startGetChannel } from "../../actions/channels";
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

    render() {
        const menu = this.props.posts && MyPostMenu(this.props.posts, this.state.selected);

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
                                    <button className="button" onClick={this.handleAddPost}>
                                        Add a new post
                                    </button>
                                    <span> </span>
                                    <button
                                        id={this.props.channel.channel_id}
                                        className="button"
                                        onClick={this.handleEditChannel}
                                    >
                                        Edit this channel
                                    </button>
                                </div>
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
                ? getVisiblePosts(state.channels.channels[0].channel_posts, state.postFilters)
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
