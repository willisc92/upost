import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import { setEvents, startSetEvent, decrementCapacityStatus, incrementCapacityStatus } from "../../actions/events";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../actions/subscriptions";
import { startGetAttendance, startAddAttendance, startDeleteAttendance } from "../../actions/attendance";
import DateRangeTag from "../DateRangeTag";
import IncentivePackage from "../IncentivePackage";
import MessageModal from "../modals/MessageModal";

class ViewEventPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openMessageModal: false
        };
    }

    closeMessageModal = () => {
        this.setState(() => {
            return { openMessageModal: false };
        });
    };

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
        if (!!this.props.event && this.props.event.event_id === event_id) {
            // pass
        } else {
            // get the event from API
            this.props
                .startSetEvent(event_id)
                .then((res) => {
                    if (res.data.deleted_flag) {
                        this.props.history.push("/");
                    }
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
            this.props.startDeleteAttendance(this.props.event.event_id).then(() => {
                this.props.decrementCapacityStatus(this.props.event);
            });
        } else {
            this.props
                .startAddAttendance(this.props.event.event_id)
                .then(() => {
                    this.props.incrementCapacityStatus(this.props.event);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error, null, 2));
                    this.setState(() => {
                        return { openMessageModal: true };
                    });
                });
        }
    };

    updateSubscriptions = () => {
        this.props.startUpdateSubscriptions(this.props.channel.channel_id);
    };

    render() {
        const registered = !!this.props.event
            ? !!this.props.attendance
                ? this.props.attendance.includes(this.props.event.event_id)
                : undefined
            : undefined;
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
                                    <button
                                        className="button"
                                        onClick={this.updateAttendance}
                                        disabled={
                                            this.props.event.capacity_status === this.props.event.capacity &&
                                            !registered
                                        }
                                    >
                                        {!!registered && registered ? "Unregister" : "Register"}
                                    </button>
                                </div>
                                {(!!this.props.event &&
                                    (this.props.event.capacity_status === this.props.event.capacity && (
                                        <p className="warning_message">
                                            The event has filled. You are no longer able to register.
                                        </p>
                                    ))) ||
                                    (this.props.event.capacity_status >= this.props.event.capacity * 0.9 && (
                                        <p className="warning_message">
                                            The event is nearing capacity. Please register soon.
                                        </p>
                                    ))}
                                <p>Description: {this.props.event.event_description}</p>
                                {!!this.props.event.event_incentive && (
                                    <IncentivePackage package={this.props.event.event_incentive} />
                                )}
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
                <MessageModal
                    isOpen={this.state.openMessageModal}
                    message="An error has occured with your registration please refresh the page and try again."
                    closeMessageModal={this.closeMessageModal}
                />
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
    startDeleteAttendance: (event_id) => dispatch(startDeleteAttendance(event_id)),
    decrementCapacityStatus: (event) => dispatch(decrementCapacityStatus(event)),
    incrementCapacityStatus: (event) => dispatch(incrementCapacityStatus(event))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewEventPage);
