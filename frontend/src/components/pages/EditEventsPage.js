import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { getCurrentUser } from "../../actions/auth";
import { MyEventMenu } from "../MyEventSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import { getVisibleEvents } from "../../selectors/myEvents";

class EditEventsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    componentWillMount() {
        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetPost(post_id)
                    .then((post_res) => {
                        if (res.data.username !== post_res.data[0].user) {
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

    render() {
        const menu =
            this.props.post &&
            MyEventMenu(
                getVisibleEvents(this.props.post, this.props.filters),
                this.state.selected,
                this.props.post.picture
            );
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Events</h1>
                        <div className="page-header__actions">
                            <EventFilterSelector />
                        </div>
                        <button className="button">Clear all events</button>{" "}
                        <button className="button">Add a new event</button>{" "}
                        <button className="button">Add/Edit Incentives</button>{" "}
                        <button className="button">Return to Edit Post</button>
                    </div>
                </div>
                <div className="content-container">
                    {!!menu ? (
                        <ScrollMenu
                            data={menu}
                            arrowLeft={ArrowLeft}
                            arrowRight={ArrowRight}
                            selected={this.state.selected}
                            onSelect={this.onSelect}
                        />
                    ) : (
                        <p>No Events to Show</p>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.eventFilters,
    loading: state.posts.loading,
    post: state.posts.posts[0]
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEventsPage);
