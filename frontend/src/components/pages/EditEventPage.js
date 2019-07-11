import React from "react";
import { editEvent } from "../../actions/events";
import { getCurrentUser } from "../../actions/auth";
import EventForm from "../forms/EventForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startSetEvent, clearEvents, deleteEvent, restoreEvent } from "../../actions/events";

class EditEventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "Event"
        };
    }

    componentWillMount() {
        this.props.clearPosts();
        this.props.clearEvents();
        const event_id = this.props.match.params.event_id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startSetEvent(event_id)
                    .then((event_res) => {
                        this.props
                            .startGetPost(event_res.data.post)
                            .then((post_res) => {
                                if (res.data.username !== post_res.data[0].user) {
                                    this.props.history.push(`/myChannels`);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                console.log(JSON.stringify(err, null, 2));
                            });
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

    onSubmit = (updates) => {
        const event_id = this.props.match.params.event_id;
        const post_id = this.props.match.params.id;

        this.props
            .editEvent(event_id, updates)
            .then((res) => this.props.history.push(`/myPosts/${post_id}/events`))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    goBack = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/events`);
    };

    goToPost = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/edit`);
    };

    editIncentive = () => {
        this.props.history.push(`/myEvents/${this.props.event.event_id}/editIncentive`);
    };

    addIncentive = () => {
        this.props.history.push(`/myEvents/${this.props.event.event_id}/addIncentive`);
    };

    restoreEvent = () => {
        const event_id = this.props.event.event_id;
        this.props
            .restoreEvent(event_id)
            .then(() => {
                this.props
                    .startSetEvent(event_id)
                    .then(() => {})
                    .catch((err) => console.log(JSON.stringify(err, null, 2)));
            })
            .catch((err) => console.log(JSON.stringify(err, null, 2)));
    };

    deleteEvent = () => {
        const event_id = this.props.event.event_id;
        this.props
            .deleteEvent(event_id)
            .then(() => {
                this.props
                    .startSetEvent(event_id)
                    .then(() => {})
                    .catch((err) => console.log(JSON.stringify(err, null, 2)));
            })
            .catch((err) => console.log(JSON.stringify(err, null, 2)));
    };

    render() {
        const event = this.props.event;
        const post = this.props.post;
        const read_only_past_event = !!event ? (new Date(event.planned_end_date) < new Date() ? true : false) : true;
        const post_read_only = !!post && post.deleted_flag;
        const event_read_only = !!event && event.deleted_flag;
        const read_only = read_only_past_event || post_read_only || event_read_only;

        return (
            !!event &&
            !!post && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Edit Event: <span>{event && event.event_title}</span>
                            </h1>
                            {post_read_only ? (
                                <div>
                                    <h2 className="page-header__subtitle__red">
                                        The post containing this event is deleted. Restore it before editing this event.
                                    </h2>
                                </div>
                            ) : event_read_only ? (
                                <div>
                                    <h2 className="page-header__subtitle__red">
                                        This event has been deleted. Restore it before editing.
                                    </h2>
                                    <button className="button" onClick={this.restoreEvent}>
                                        Restore Event
                                    </button>{" "}
                                </div>
                            ) : read_only_past_event ? (
                                <div>
                                    <h2 className="page-header__subtitle__red">Cannot edit a past event.</h2>
                                </div>
                            ) : (
                                <div className="page-header__actions">
                                    <span>
                                        <button className="button" onClick={this.deleteEvent}>
                                            Delete Event
                                        </button>{" "}
                                        {!!event.event_incentive ? (
                                            <button className="button" onClick={this.editIncentive}>
                                                Edit Incentive
                                            </button>
                                        ) : (
                                            <button className="button" onClick={this.addIncentive}>
                                                Add Incentive
                                            </button>
                                        )}
                                    </span>
                                </div>
                            )}
                            <div className="page-header__actions">
                                <button className="button" onClick={this.goToPost}>
                                    Go Back to Post
                                </button>{" "}
                                <button className="button" onClick={this.goBack}>
                                    Go Back to Events
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        <EventForm
                            read_only={read_only}
                            event={event}
                            onSubmit={this.onSubmit}
                            nextStep={"Save and Return"}
                            post={this.props.match.params.id}
                        />
                    </div>
                </div>
            )
        );
    }
}

const mapStateToprops = (state) => ({
    post: state.posts.posts[0],
    event: state.events.events.length !== 0 ? state.events.events : null
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    clearEvents: () => dispatch(clearEvents()),
    editEvent: (id, updates) => dispatch(editEvent(id, updates)),
    startGetPost: (id) => dispatch(startGetPost(id)),
    startSetEvent: (id) => dispatch(startSetEvent(id)),
    restoreEvent: (id) => dispatch(restoreEvent(id)),
    deleteEvent: (id) => dispatch(deleteEvent(id))
});

export default connect(
    mapStateToprops,
    mapDispatchToProps
)(EditEventPage);
