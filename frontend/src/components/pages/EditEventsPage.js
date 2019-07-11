import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { getCurrentUser } from "../../actions/auth";
import { MyEventMenu } from "../MyEventSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import { getVisibleEvents } from "../../selectors/myEvents";
import { deleteEvent } from "../../actions/events";
import moment from "moment";

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

    clearAllEvents = () => {
        const promises = [];
        const events = this.props.post.post_events;

        events.forEach((event) => {
            promises.push(this.props.deleteEvent(event.event_id));
        });

        Promise.all(promises)
            .then(() => {
                this.props.startGetPost(this.props.match.params.id);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    returnEditPosts = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/edit`);
    };

    addNewEvent = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/addEvent`);
    };

    render() {
        const readOnly = this.props.post && this.props.post.deleted_flag;

        const menu =
            this.props.post &&
            MyEventMenu(getVisibleEvents(this.props.post, this.props.filters, readOnly), this.state.selected, readOnly);

        return (
            !!this.props.post && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Add/Edit Events for <span>{this.props.post && this.props.post.post_title}</span>
                            </h1>
                            {this.props.post.deleted_flag && (
                                <div>
                                    <h3 className="page-header__subtitle__red">
                                        Post Deletion Date:{" "}
                                        {moment(this.props.post.deletion_date).format("MMMM Do YYYY")} - Restore the
                                        Post To Add/Edit Events
                                    </h3>
                                    <button className="button" onClick={this.returnEditPosts}>
                                        Go to Post
                                    </button>
                                </div>
                            )}
                            <div className="page-header__actions">
                                <EventFilterSelector />
                            </div>
                            {!this.props.post.deleted_flag && (
                                <div>
                                    <button className="button" onClick={this.addNewEvent}>
                                        Add an Event
                                    </button>{" "}
                                    <button className="button" onClick={this.returnEditPosts}>
                                        Edit Post
                                    </button>{" "}
                                    {!!menu && menu.length > 0 && (
                                        <button className="button" onClick={this.clearAllEvents}>
                                            Delete All Events
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="content-container">
                        {!!menu && menu.length > 0 ? (
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
            )
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
    startGetPost: (id) => dispatch(startGetPost(id)),
    deleteEvent: (id) => dispatch(deleteEvent(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEventsPage);
