import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetChannel } from "../../actions/channels";
import {
    setEvents,
    startSetEvent,
    decrementCapacityStatus,
    incrementCapacityStatus,
    deleteEvent,
    restoreEvent
} from "../../actions/events";
import { startGetSubscriptions, startUpdateSubscriptions } from "../../actions/subscriptions";
import { startGetAttendance, startAddAttendance, startDeleteAttendance } from "../../actions/attendance";
import DateRangeTag from "../DateRangeTag";
import IncentivePackage from "../IncentivePackage";
import MessageModal from "../modals/MessageModal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import moment from "moment";
import { getCurrentUser } from "../../actions/auth";
import CustomStepper from "../CustomStepper";
import { ShareGroup } from "../Share";
import { baseURL } from "../../utils/baseURL";

class ViewEventPage extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            openMessageModal: false,
            error: "",
            isOwner: false,
            steps: [],
            activeStep: undefined,
            url: baseURL.concat(this.props.location.pathname)
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
                this.checkEventOwnerAgainstCurrentUser(this.props.event);
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
                this.checkEventOwnerAgainstCurrentUser(this.props.event);
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

    addIncentive = () => {
        this.props.history.push(`/myEvents/${this.props.event.event_id}/addIncentive`);
    };

    checkEventOwnerAgainstCurrentUser = (event_obj) => {
        getCurrentUser()
            .then((user_res) => {
                const isOwner = user_res.data.username === event_obj.event_owner;

                if (this._isMounted) {
                    if (isOwner) {
                        if (!!event_obj.event_incentive) {
                            this.setState(() => ({
                                isOwner,
                                steps: [
                                    { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                    {
                                        label: `Bulletin Board: ${this.props.event.path.channel.channel_name}`,
                                        onClick: this.goToChannel
                                    },
                                    { label: `Post: ${this.props.post.post_title}`, onClick: this.returnToPost },
                                    { label: "See Events", onClick: this.moveToPostEventsPage },
                                    { label: `Event: ${this.props.event.event_title}`, onClick: null },
                                    { label: "Edit Event", onClick: this.editEvent },
                                    { label: "Edit Incentive", onClick: this.editIncentive }
                                ],
                                activeStep: 4
                            }));
                        } else {
                            this.setState(() => ({
                                isOwner,
                                steps: [
                                    { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                    {
                                        label: `Bulletin Board: ${this.props.event.path.channel.channel_name}`,
                                        onClick: this.goToChannel
                                    },
                                    { label: `Post: ${this.props.post.post_title}`, onClick: this.returnToPost },
                                    { label: "See Events", onClick: this.moveToPostEventsPage },
                                    { label: `Event: ${this.props.event.event_title}`, onClick: null },
                                    { label: "Edit Event", onClick: this.editEvent },
                                    { label: "Add Incentive", onClick: this.addIncentive }
                                ],
                                activeStep: 4
                            }));
                        }
                    } else {
                        this.setState(() => ({
                            isOwner,
                            steps: [
                                {
                                    label: `Bulletin Board: ${this.props.event.path.channel.channel_name}`,
                                    onClick: this.goToChannel
                                },
                                { label: `Post: ${this.props.post.post_title}`, onClick: this.returnToPost },
                                { label: "See Events", onClick: this.moveToPostEventsPage },
                                { label: `Event: ${this.props.event.event_title}`, onClick: null }
                            ],
                            activeStep: 3
                        }));
                    }
                }

                if (!isOwner) {
                    if (event_obj.deleted_flag) {
                        this.props.history.push("/");
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        this._isMounted = true;

        const event_id = parseInt(this.props.match.params.id);

        // check to see if event is provided
        if (!!this.props.event && this.props.event.event_id === event_id) {
            this.checkPost(this.props.event.post, event_id);
        } else {
            // get the event from API
            this.props
                .startSetEvent(event_id)
                .then((res) => {
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

    componentWillUnmount() {
        this._isMounted = false;
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
                        return { openMessageModal: true, error: error.response.data.error };
                    });
                });
        }
    };

    updateSubscriptions = () => {
        this.props.startUpdateSubscriptions(this.props.channel.channel_id);
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

    editEvent = () => {
        const post_id = this.props.event.post;
        const event_id = this.props.event.event_id;
        this.props.history.push(`/myPosts/${post_id}/events/${event_id}/edit`);
    };

    editIncentive = () => {
        const event_id = this.props.event.event_id;
        this.props.history.push(`/myEvents/${event_id}/editIncentive`);
    };

    goToChannel = () => {
        const channel = this.props.post.channel;
        this.props.history.push(`/channels/${channel}`);
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    returnToPost = () => {
        this.props.history.push(`/post/${this.props.post.post_id}`);
    };

    moveToPostEventsPage = () => {
        this.props.history.push(`/post-events/${this.props.post.post_id}`);
    };

    render() {
        const registered = !!this.props.event
            ? !!this.props.attendance
                ? this.props.attendance.includes(this.props.event.event_id)
                : undefined
            : undefined;
        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1">Event</Typography>
                        <CustomStepper steps={this.state.steps} activeStep={this.state.activeStep} />
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    <Box display="flex">
                        <div className="content-container-twothirds">
                            {!!this.props.post && (
                                <img
                                    className="post-image"
                                    src={
                                        !!this.props.post.picture
                                            ? this.props.post.picture
                                            : CDNLink + "/dist/images/polaroid_default.png"
                                    }
                                />
                            )}
                            {!!this.props.event && (
                                <React.Fragment>
                                    <Box display="flex" justifyContent="space-between" py={2}>
                                        <Box maxWidth="50%" display="flex">
                                            <Box paddingRight={0.5}>
                                                <Typography variant="h2" color="primary">
                                                    {this.props.event.event_title}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            {this.state.isOwner &&
                                                (this.props.event.deleted_flag ? (
                                                    <React.Fragment>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={this.restoreEvent}
                                                        >
                                                            Restore Event
                                                        </Button>
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={this.deleteEvent}
                                                        >
                                                            Delete Event
                                                        </Button>{" "}
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={this.editEvent}
                                                        >
                                                            Edit Event{" "}
                                                        </Button>{" "}
                                                    </React.Fragment>
                                                ))}

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.updateAttendance}
                                                disabled={
                                                    (this.props.event.capacity_status === this.props.event.capacity &&
                                                        !registered) ||
                                                    moment(this.props.event.planned_end_date) < moment()
                                                }
                                            >
                                                {!!registered && registered ? "Unregister" : "Register"}
                                            </Button>
                                        </Box>
                                    </Box>
                                    <ShareGroup url={this.state.url} quote={this.props.event.event_title} />
                                    {this.props.event.deleted_flag && (
                                        <Typography variant="h3" color="error" gutterBottom>
                                            Deletion Date:{" "}
                                            {moment(this.props.event.deletion_date).format("MMMM Do YYYY")}
                                        </Typography>
                                    )}
                                    {(!!this.props.event &&
                                        (moment(this.props.event.planned_end_date) < moment() && (
                                            <Typography color="error" variant="body1" gutterBottom>
                                                The event has passed. You are no longer able to register.
                                            </Typography>
                                        ))) ||
                                        (this.props.event.capacity_status === this.props.event.capacity && (
                                            <Typography color="error" variant="body1" gutterBottom>
                                                The event has filled. You are no longer able to register.
                                            </Typography>
                                        )) ||
                                        (this.props.event.capacity_status >= this.props.event.capacity * 0.9 && (
                                            <Typography color="error" variant="body1" gutterBottom>
                                                The event is nearing capacity. Please register soon.
                                            </Typography>
                                        ))}
                                    <Typography variant="body1" gutterBottom>
                                        Description: {this.props.event.event_description}
                                    </Typography>
                                    {!!this.props.event.event_incentive && (
                                        <IncentivePackage package={this.props.event.event_incentive} />
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                        <div className="content-container-onethirds">
                            {!!this.props.channel && (
                                <div>
                                    <Link
                                        className="post__link"
                                        to={{
                                            pathname: `/channel/${this.props.channel.channel_id}`
                                        }}
                                    >
                                        <Box paddingTop={2}>
                                            <Typography color="primary" variant="h4">
                                                {this.props.channel.channel_name}
                                            </Typography>
                                        </Box>
                                    </Link>
                                    {!!this.props.subscriptions && (
                                        <Box py={2}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.updateSubscriptions}
                                            >
                                                {this.props.subscriptions.includes(this.props.channel.channel_id)
                                                    ? "Unsubscribe"
                                                    : "Subscribe"}
                                            </Button>
                                        </Box>
                                    )}
                                </div>
                            )}
                            {!!this.props.event && (
                                <React.Fragment>
                                    <Typography variant="h4" gutterBottom>
                                        Date and Time:
                                    </Typography>
                                    <DateRangeTag
                                        startDate={this.props.event.planned_start_date}
                                        endDate={this.props.event.planned_end_date}
                                    />
                                    <Box paddingTop={2}>
                                        <Typography variant="h4" gutterBottom>
                                            Location:
                                        </Typography>
                                        <Typography variant="body1">{this.props.event.location}</Typography>
                                    </Box>
                                    <Box paddingTop={2}>
                                        <Typography variant="h4" gutterBottom>
                                            Capacity:
                                        </Typography>
                                        <Typography variant="body1">{this.props.event.capacity}</Typography>
                                    </Box>
                                    <Box paddingTop={2}>
                                        <Typography variant="h4" gutterBottom>
                                            Cost:
                                        </Typography>
                                        <Typography variant="body1">{this.props.event.cost}</Typography>
                                    </Box>
                                </React.Fragment>
                            )}
                            {!!this.props.post && (
                                <Box paddingTop={2}>
                                    <Typography variant="h4" gutterBottom>
                                        Contact Information
                                    </Typography>
                                    <Typography variant="body1">{`Phone Number: ${
                                        this.props.post.phone_number
                                    }`}</Typography>
                                    <Typography variant="body1">{`Email: ${this.props.post.email}`}</Typography>
                                </Box>
                            )}
                        </div>
                    </Box>
                </Container>
                <MessageModal
                    isOpen={this.state.openMessageModal}
                    message={this.state.error}
                    closeMessageModal={this.closeMessageModal}
                />
            </React.Fragment>
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
    incrementCapacityStatus: (event) => dispatch(incrementCapacityStatus(event)),
    restoreEvent: (id) => dispatch(restoreEvent(id)),
    deleteEvent: (id) => dispatch(deleteEvent(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewEventPage);
