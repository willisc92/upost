import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { getCurrentUser } from "../../actions/auth";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import { getVisibleEvents } from "../../selectors/myEvents";
import { deleteEvent, startGetEvent } from "../../actions/events";
import moment from "moment";
import MyEventSummary from "../MyEventSummary";

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
                    .startGetEvent(post_id)
                    .then(() => {
                        this.props
                            .startGetPost(post_id)
                            .then((post_res) => {
                                if (res.data.username !== post_res.data[0].user) {
                                    this.props.history.push("/myChannels");
                                }
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(err);
                console.log(JSON.stringify(err, null, 2));
            });
    }

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    clearAllEvents = () => {
        const promises = [];
        const readOnly = !!this.props.post && this.props.post.deleted_flag;
        const events = getVisibleEvents(this.props.events, this.props.filters, readOnly);

        events.forEach((event) => {
            promises.push(this.props.deleteEvent(event.event_id));
        });

        Promise.all(promises)
            .then(() => {
                this.props.startGetEvent(this.props.match.params.id);
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
        const readOnly = !!this.props.post && this.props.post.deleted_flag;
        const events = !!this.props.events && getVisibleEvents(this.props.events, this.props.filters, readOnly);

        return (
            !!events && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Add/Edit Events for <span>{this.props.post && this.props.post.post_title}</span>
                            </h1>
                            {readOnly && (
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
                            {!readOnly && (
                                <div>
                                    <button className="button" onClick={this.addNewEvent}>
                                        Add an Event
                                    </button>{" "}
                                    <button className="button" onClick={this.returnEditPosts}>
                                        Edit Post
                                    </button>{" "}
                                    {!!events && events.length > 0 && (
                                        <button className="button" onClick={this.clearAllEvents}>
                                            Delete All Events
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="polaroid__container">
                            {events.length > 0 ? (
                                events.map((event) => {
                                    return (
                                        <MyEventSummary
                                            event={event}
                                            key={event.event_id}
                                            pathName={`/myPosts/${event.post}/events/${event.event_id}/edit`}
                                            readOnly={readOnly}
                                            inHorizontalMenu={false}
                                        />
                                    );
                                })
                            ) : (
                                <p>No Events to Show</p>
                            )}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.eventFilters,
    loading: state.posts.loading,
    post: state.posts.posts[0],
    events: state.events.events
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id)),
    startGetEvent: (id) => dispatch(startGetEvent(id)),
    deleteEvent: (id) => dispatch(deleteEvent(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEventsPage);
