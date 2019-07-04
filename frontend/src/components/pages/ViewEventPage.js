import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import { setEvents, startSetEvent } from "../../actions/events";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../actions/subscriptions";
import { startGetAttendance, startAddAttendance, startDeleteAttendance } from "../../actions/attendance";
import DateRangeTag from "../DateRangeTag";

class ViewEventPage extends React.Component {
    checkPost = (post_id, event_id) => {
        // check to see if post is provided
        if (!!this.props.post) {
            // check if the post contains the event
            const match = this.props.post.post_events.filter((event) => {
                return event.event_id === event_id;
            });

            // if post doesn't contain the event
            if (match.length === 0) {
                // get post from API
                this.getPostFromAPI(post_id);
            } else {
                this.checkChannel();
            }
        } else {
            // get post from API
            this.getPostFromAPI(post_id);
        }
    };

    getPostFromAPI = (post_id) => {
        this.props.clearPosts();
        this.props
            .startGetPost(post_id)
            .catch((err) => {
                console.log("error in getting post information", JSON.stringify(err, null, 2));
            })
            .then(() => {
                this.checkChannel();
            });
    };

    checkChannel = () => {
        // check to see if channel is provided
        if (!!this.props.channel && this.props.channel.channel_id === this.props.post.channel) {
            // pass
        } else {
            // get channel from API
            this.props.startGetChannel(this.props.post.channel).catch((err) => {
                console.log("error in getting channel information", JSON.stringify(err, null, 2));
            });
        }
    };

    componentDidMount() {
        const event_id = parseInt(this.props.match.params.id);

        // check to see if event is provided
        if (
            !!this.props.location.state &&
            !!this.props.location.state.event &&
            this.props.location.state.event.event_id === event_id
        ) {
            // add provided event to the store
            this.props.setEvents(this.props.location.state.event);
            this.checkPost(this.props.location.state.event.post, event_id);
        } else {
            // get the event from API
            this.props
                .startSetEvent(event_id)
                .then(() => {
                    this.checkPost(this.props.event.post, event_id);
                })
                .catch((error) => {
                    console.log("error in getting event information", JSON.stringify(error, null, 2));
                });
        }

        // check to see if subscriptions is provided
        if (!this.props.subscriptions) {
            this.props.startGetSubscriptions();
        }

        // check to see if attendance is provided
        if (!this.props.attendance) {
            this.props.startGetAttendance();
        }
    }

    updateAttendance = () => {
        if (this.props.attendance.includes(this.props.event.event_id)) {
            this.props.startDeleteAttendance(this.props.event.event_id);
        } else {
            this.props.startAddAttendance(this.props.event.event_id);
        }
    };

    updateSubscriptions = () => {
        this.props.startUpdateSubscriptions(this.props.channel.channel_id);
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Event</h1>
                    </div>
                </div>
                <div className="content-container-split">
                    <div className="content-container-twothirds">
                        {!!this.props.post && <img className="post-image" src={this.props.post.picture} />}
                        {!!this.props.event && (
                            <div>
                                <div className="post__title">
                                    <h1 className="post__header">{this.props.event.event_title}</h1>
                                    <button className="button" onClick={this.updateAttendance}>
                                        {!!this.props.attendance &&
                                        !!this.props.event &&
                                        this.props.attendance.includes(this.props.event.event_id)
                                            ? "Unregister"
                                            : "Register"}
                                    </button>
                                </div>
                                <p>Description: {this.props.event.event_description}</p>
                            </div>
                        )}
                    </div>
                    <div className="content-container-onethirds">
                        {!!this.props.channel && (
                            <div>
                                <Link
                                    className="post__link"
                                    to={{ pathname: `/channel/${this.props.channel.channel_id}` }}
                                >
                                    <h2 className="post__header2">{this.props.channel.channel_name}</h2>
                                </Link>
                                {!!this.props.subscriptions && (
                                    <button className="button" onClick={this.updateSubscriptions}>
                                        {this.props.subscriptions.includes(this.props.channel.channel_id)
                                            ? "Unsubscribe"
                                            : "Subscribe"}
                                    </button>
                                )}
                            </div>
                        )}
                        {!!this.props.event && (
                            <div>
                                <h2 className="post__header2">Date and Time:</h2>
                                <DateRangeTag
                                    startDate={this.props.event.planned_start_date}
                                    endDate={this.props.event.planned_end_date}
                                />
                                <div className="post__infobox">
                                    <h2>Location:</h2>
                                    <p>{this.props.event.location}</p>
                                </div>
                                <div className="post__infobox">
                                    <h2>Capacity:</h2>
                                    <p>{this.props.event.capacity}</p>
                                </div>
                                <div className="post__infobox">
                                    <h2>Cost:</h2>
                                    <p>{this.props.event.cost}</p>
                                </div>
                            </div>
                        )}
                        {!!this.props.post && (
                            <div>
                                <h2 className="post__header2">Contact Information</h2>
                                <p>{`Phone Number: ${this.props.post.phone_number}`}</p>
                                <p>{`Email: ${this.props.post.email}`}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts[0],
    channel: state.channels.channels[0],
    event: state.events.events,
    subscriptions: state.subscriptions.subscriptions,
    attendance: state.attendance.attendance
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id)),
    startGetChannel: (id) => dispatch(startGetChannel(id)),
    setEvents: (event) => dispatch(setEvents(event)),
    startSetEvent: (id) => dispatch(startSetEvent(id)),
    startGetSubscriptions: () => dispatch(startGetSubscriptions()),
    startUpdateSubscriptions: (id) => dispatch(startUpdateSubscriptions(id)),
    startGetAttendance: () => dispatch(startGetAttendance()),
    startAddAttendance: (event_id) => dispatch(startAddAttendance(event_id)),
    startDeleteAttendance: (event_id) => dispatch(startDeleteAttendance(event_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewEventPage);
