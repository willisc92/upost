import React from "react";
import { editEvent } from "../../actions/events";
import { getCurrentUser } from "../../actions/auth";
import EventForm from "../forms/EventForm";
import { connect } from "react-redux";
import { startSetEvent, clearEvents, deleteEvent, restoreEvent } from "../../actions/events";
import MessageModal from "../modals/MessageModal";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CustomStepper from "../CustomStepper";
import { EventDescription } from "../tooltip_descriptions/Descriptions";
import { HelpToolTip } from "../HelpTooltip";

class EditEventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "Event",
            openMessageModal: false,
            steps: [],
            activeStep: undefined
        };
    }

    componentWillMount() {
        this.props.clearEvents();
        const event_id = this.props.match.params.event_id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startSetEvent(event_id)
                    .then((event_res) => {
                        if (event_res.data.event_owner !== res.data.username) {
                            this.props.history.push(`/myChannels`);
                        } else {
                            if (!!this.props.event.event_incentive) {
                                this.setState(() => ({
                                    steps: [
                                        { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                        {
                                            label: `Bulletin Board: ${this.props.event.path.channel.channel_name}`,
                                            onClick: this.moveToBulletinBoard
                                        },
                                        {
                                            label: `Post: ${this.props.event.path.post.post_title}`,
                                            onClick: this.goToPost
                                        },
                                        { label: "See Events", onClick: this.moveToPostEventsPage },
                                        {
                                            label: `Event: ${this.props.event.event_title}`,
                                            onClick: this.moveToEventPage
                                        },
                                        { label: `Edit Event`, onClick: null },
                                        { label: `Edit Event Perk`, onClick: this.moveToEditEventPerkPage }
                                    ],
                                    activeStep: 5
                                }));
                            } else {
                                this.setState(() => ({
                                    steps: [
                                        { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                        {
                                            label: `Bulletin Board: ${this.props.event.path.channel.channel_name}`,
                                            onClick: this.moveToBulletinBoard
                                        },
                                        {
                                            label: `Post: ${this.props.event.path.post.post_title}`,
                                            onClick: this.goToPost
                                        },
                                        { label: "See Events", onClick: this.moveToPostEventsPage },
                                        {
                                            label: `Event: ${this.props.event.event_title}`,
                                            onClick: this.moveToEventPage
                                        },
                                        { label: `Edit Event`, onClick: null },
                                        { label: `Add Event Perk`, onClick: this.moveToAddEventPerkPage }
                                    ],
                                    activeStep: 5
                                }));
                            }
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
    }

    closeMessageModal = () => {
        this.setState(() => {
            return { openMessageModal: false };
        });
    };

    onSubmit = (updates) => {
        const event_id = this.props.match.params.event_id;
        const post_id = this.props.match.params.id;

        this.props
            .editEvent(event_id, updates)
            .then((res) => this.props.history.push(`/post-events/${post_id}`))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
                // dispaly error message
                this.setState(() => {
                    return { openMessageModal: true };
                });
            });
    };

    goBack = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/post-events/${post_id}`);
    };

    goToPost = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/post/${post_id}`);
    };

    moveToPostEventsPage = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/post-events/${post_id}`);
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    moveToBulletinBoard = () => {
        this.props.history.push(`/channels/${this.props.event.path.channel.channel_id}`);
    };

    moveToEventPage = () => {
        const event_id = this.props.match.params.event_id;
        this.props.history.push(`/event/${event_id}`);
    };

    moveToEditEventPerkPage = () => {
        this.props.history.push(`/myEvents/${this.props.event.event_id}/editPerk`);
    };

    moveToAddEventPerkPage = () => {
        this.props.history.push(`/myEvents/${this.props.event.event_id}/addPerk`);
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
        const event = !Array.isArray(this.props.event) && this.props.event;
        const read_only_past_event = !!event ? (new Date(event.planned_end_date) < new Date() ? true : false) : true;
        const post_read_only = !!event && event.post_deleted_flag;
        const event_read_only = !!event && event.deleted_flag;
        const read_only = read_only_past_event || post_read_only || event_read_only;

        return (
            !!event && (
                <div>
                    <Box bgcolor="secondary.main" py={3}>
                        <Container maxWidth="xl">
                            <Typography variant="h1" gutterBottom>
                                Edit Event:{" "}
                                <Typography variant="inherit" display="inline" color="primary">
                                    {event && event.event_title}
                                </Typography>
                                <HelpToolTip jsx={<Typography variant="caption">{EventDescription}</Typography>} />
                            </Typography>
                            <CustomStepper steps={this.state.steps} activeStep={this.state.activeStep} />
                            {post_read_only ? (
                                <Typography variant="h2" color="error" gutterBottom>
                                    The post containing this event is deleted. Restore it before editing this event.
                                </Typography>
                            ) : event_read_only ? (
                                <Box paddingBottom={2}>
                                    <Typography variant="h2" color="error" gutterBottom>
                                        This event has been deleted. Restore it before editing.
                                    </Typography>
                                    <Button onClick={this.restoreEvent} variant="contained" color="primary">
                                        Restore Event
                                    </Button>{" "}
                                </Box>
                            ) : read_only_past_event ? (
                                <Typography variant="h2" color="error" gutterBottom>
                                    Cannot edit a past event.
                                </Typography>
                            ) : (
                                <Box paddingBottom={2}>
                                    <span>
                                        <Button variant="contained" color="primary" onClick={this.deleteEvent}>
                                            Delete Event
                                        </Button>{" "}
                                        {!!event.event_incentive ? (
                                            <Button variant="contained" color="primary" onClick={this.moveToEditEventPerkPage}>
                                                Edit Event Perk
                                            </Button>
                                        ) : (
                                            <Button variant="contained" color="primary" onClick={this.moveToAddEventPerkPage}>
                                                Add Event Perk
                                            </Button>
                                        )}
                                    </span>
                                </Box>
                            )}
                            <Box>
                                <Button variant="contained" color="primary" onClick={this.goToPost}>
                                    Go Back to Post
                                </Button>{" "}
                                <Button variant="contained" color="primary" onClick={this.goBack}>
                                    Go Back to Events
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                    <Container maxWidth="xl">
                        <EventForm
                            read_only={read_only}
                            event={event}
                            onSubmit={this.onSubmit}
                            nextStep={"Save and Return"}
                            post={this.props.match.params.id}
                            showAttendees={true}
                        />
                    </Container>
                    <MessageModal
                        isOpen={this.state.openMessageModal}
                        message="An error has ocured with editing your event. Please refresh the page and try again."
                        closeMessageModal={this.closeMessageModal}
                    />
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    event: !!state.events.events && state.events.events
});

const mapDispatchToProps = (dispatch) => ({
    clearEvents: () => dispatch(clearEvents()),
    editEvent: (id, updates) => dispatch(editEvent(id, updates)),
    startSetEvent: (id) => dispatch(startSetEvent(id)),
    restoreEvent: (id) => dispatch(restoreEvent(id)),
    deleteEvent: (id) => dispatch(deleteEvent(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEventPage);
