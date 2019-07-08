import React from "react";
import { connect } from "react-redux";
import { BrowsePostMenu } from "../MyPostSummary";
import { BrowseChannelsMenu } from "../ChannelListItem";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";
import { searchPosts, clearPosts } from "../../actions/posts";
import { searchChannels, clearChannels } from "../../actions/channels";

export class SearchResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
    }

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    componentWillMount() {
        this.props.clearPosts();
        this.props.clearChannels();
        let promises = [];

        const text = this.props.match.params.text;

        promises.push(this.props.searchPosts(text));
        promises.push(this.props.searchChannels(text));

        Promise.all(promises)
            .then(() => {})
            .catch((err) => console.log(JSON.stringify(err, null, 2)));
    }

    render() {
        const channels_menu = !!this.props.channels && BrowseChannelsMenu(this.props.channels, this.state.selected);
        const post_menu = !!this.props.posts && BrowsePostMenu(this.props.posts, this.state.selected);

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Search Results for <span>{this.props.match.params.text}</span>
                        </h1>
                    </div>
                </div>
                <div className="content-container">
                    <div className="horizontal-menu_wrapper">
                        <div className="menu_header">
                            <h1>Channels</h1>
                        </div>
                        {channels_menu.length === 0 ? (
                            <h2>No Matching Channels</h2>
                        ) : (
                            <ScrollMenu
                                data={channels_menu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                            />
                        )}
                    </div>
                    <div className="horizontal-menu_wrapper">
                        <div className="menu_header">
                            <h1>Posts</h1>
                        </div>
                        {post_menu.length === 0 ? (
                            <h2>No Matching Posts</h2>
                        ) : (
                            <ScrollMenu
                                data={post_menu}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channels: state.channels.channels,
        posts: state.posts.posts
    };
};

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    searchPosts: (text) => dispatch(searchPosts(text)),
    clearChannels: () => dispatch(clearChannels()),
    searchChannels: (text) => dispatch(searchChannels(text))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPage);
