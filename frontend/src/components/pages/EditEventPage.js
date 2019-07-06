import React from "react";
import { editEvent } from "../../actions/events";
import { getCurrentUser } from "../../actions/auth";
import EventForm from "../forms/EventForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startSetEvent, clearEvents } from "../../actions/events";

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
                                console.log(JSOn.stringify(err, null, 2));
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

    editIncentive = () => {
        this.props.history.push(`/myEvents/${this.props.event.event_id}/editIncentive`);
    };

    addIncentive = () => {
        this.props.history.push(`/myEvents/${this.props.event.event_id}/addIncentive`);
    };

    render() {
        const event = this.props.event;
        const read_only = !!event ? (new Date(event.planned_start_date) < new Date() ? true : false) : true;

        return (
            !!event && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Edit Event: <span>{event && event.event_title}</span>
                            </h1>
                            <div className="page-header__actions">
                                <span>
                                    {!!event.event_incentive ? (
                                        <button className="button" onClick={this.editIncentive}>
                                            Edit Incentive
                                        </button>
                                    ) : (
                                        !read_only && (
                                            <button className="button" onClick={this.addIncentive}>
                                                Add Incentive
                                            </button>
                                        )
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        {read_only && <p className="form__error">Cannot Edit a Past/Ongoing Event</p>}
                        <EventForm
                            read_only={read_only}
                            event={event}
                            onSubmit={this.onSubmit}
                            nextStep={"Save and Return"}
                            post={this.props.match.params.id}
                        />
                        <button className="button" onClick={this.goBack}>
                            {" "}
                            Go Back{" "}
                        </button>
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
    startSetEvent: (id) => dispatch(startSetEvent(id))
});

export default connect(
    mapStateToprops,
    mapDispatchToProps
)(EditEventPage);
