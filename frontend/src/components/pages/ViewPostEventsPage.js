import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetEvent, setEvents } from "../../actions/events";
import { resetEventFilters } from "../../actions/event_filters";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import { getVisibleEvents } from "../../selectors/myEvents";
import EventSummary from "../MyEventSummary";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { getCurrentUser } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import CustomStepper from "../CustomStepper";
import { HelpToolTip } from "../HelpTooltip";
import { EventDescription } from "../tooltip_descriptions/Descriptions";
import { MyCalendar } from "../Calendar";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Loading from "./LoadingPage";

class ViewPostEventsPage extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            selected: 0,
            isOwner: false,
            steps: [],
            activeStep: undefined,
            view: "list"
        };
    }

    onSelectEvent = (e) => {
        this.props.history.push(`/event/${e.id}`);
    };

    onViewChange = (e, value) => {
        this.props.resetEventFilters();

        this.setState(() => ({
            view: value
        }));
    };

    checkPostAgainstCurrentUser = (post_obj) => {
        getCurrentUser()
            .then((user_res) => {
                const isOwner = user_res.data.username === post_obj.user;

                if (this._isMounted) {
                    if (isOwner) {
                        this.setState(() => ({
                            isOwner,
                            steps: [
                                { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                {
                                    label: `Bulletin Board: ${this.props.post.path.channel.channel_name}`,
                                    onClick: this.goToChannel
                                },
                                { label: `Post: ${this.props.post.post_title}`, onClick: this.returnToPost },
                                { label: "See Events", onClick: null },
                                { label: null, onClick: null }
                            ],
                            activeStep: 3
                        }));
                    } else {
                        this.setState(() => ({
                            isOwner,
                            steps: [
                                {
                                    label: `Bulletin Board`,
                                    onClick: this.goToChannel
                                },
                                { label: `Post: ${this.props.post.post_title}`, onClick: this.returnToPost },
                                { label: "See Events", onClick: null },
                                { label: null, onClick: null }
                            ],
                            activeStep: 2
                        }));
                    }
                }

                if (post_obj.deleted_flag) {
                    this.props.history.push("/");
                }
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.props.resetEventFilters();
        this._isMounted = true;

        const post_id = parseInt(this.props.match.params.id);

        // check to see if current post in store matches given id
        if (!!this.props.post && this.props.post.post_id === post_id) {
            this.props.setEvents(this.props.post.post_events);
            this.checkPostAgainstCurrentUser(this.props.post);
        } else {
            // load post from API
            this.props.clearPosts();
            this.props
                .startGetPost(post_id)
                .then((res) => {
                    this.checkPostAgainstCurrentUser(res.data[0]);
                    this.props
                        .startGetEvent(post_id)
                        .then(() => {})
                        .catch((err) => console.log(err));
                })
                .catch((err) => {
                    console.log("error in getting post information", JSON.stringify(err, null, 2));
                });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    clearAllEvents = () => {
        const promises = [];
        const events = getVisibleEvents(this.props.events, this.props.filters, false);

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

    returnToPost = () => {
        this.props.history.push(`/post/${this.props.match.params.id}`);
    };

    addNewEvent = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/addEvent`);
    };

    goToChannel = () => {
        const channel = this.props.post.channel;
        this.props.history.push(`/channels/${channel}`);
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    render() {
        const events = !!this.props.events && getVisibleEvents(this.props.events, this.props.filters, false);
        const calendarEvents =
            !!events &&
            events.map((event) => ({
                id: event.event_id,
                title: event.event_title,
                start: new Date(event.planned_start_date),
                end: new Date(event.planned_end_date),
                allDay: false
            }));

        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        {!!this.props.post && (
                            <React.Fragment>
                                <Typography variant="h1" gutterBottom>
                                    Events for
                                    <Typography variant="h1" color="primary" display="inline">
                                        {" "}
                                        {this.props.post.post_title}
                                    </Typography>
                                    <HelpToolTip
                                        jsx={
                                            <React.Fragment>
                                                <Typography variant="caption">
                                                    {EventDescription}
                                                    <br />
                                                    <br />
                                                    From here you can:
                                                    <ul>
                                                        <li>See all events tied to the given post</li>
                                                        <li>Click on a specific event to get more details</li>
                                                        <li>Return to the post that contains these events</li>
                                                        {this.state.isOwner && (
                                                            <React.Fragment>
                                                                <li>Add an event</li>
                                                                <li>Delete all events matching the current filters</li>
                                                            </React.Fragment>
                                                        )}
                                                    </ul>
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <ToggleButtonGroup exclusive onChange={this.onViewChange}>
                                        <ToggleButton key={0} value={"calendar"}>
                                            Calendar View
                                        </ToggleButton>
                                        <ToggleButton key={1} value={"list"}>
                                            List View
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Typography>
                            </React.Fragment>
                        )}
                        <CustomStepper steps={this.state.steps} activeStep={this.state.activeStep} />
                        <Box marginTop={2}>
                            <EventFilterSelector foodSpecific={false} listView={this.state.view === "list"} />
                        </Box>
                        {this.state.isOwner && (
                            <React.Fragment>
                                <Button color="primary" variant="contained" onClick={this.addNewEvent}>
                                    Add an Event
                                </Button>{" "}
                                {!!events && events.length > 0 && (
                                    <React.Fragment>
                                        <Button color="primary" variant="contained" onClick={this.clearAllEvents}>
                                            Delete All Events
                                        </Button>{" "}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}
                        <Button color="primary" variant="contained" onClick={this.returnToPost}>
                            Return To Post
                        </Button>
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    <Box py={2}>
                        {events ? (
                            events.length > 0 ? (
                                <React.Fragment>
                                    {this.state.view === "list" && (
                                        <Box display="flex" flexWrap="wrap">
                                            {events.map((event) => {
                                                return (
                                                    <EventSummary
                                                        key={event.event_id}
                                                        event={event}
                                                        pathName={`/event/${event.event_id}`}
                                                        inHorizontalMenu={false}
                                                    />
                                                );
                                            })}
                                        </Box>
                                    )}
                                    {this.state.view === "calendar" && (
                                        <MyCalendar events={calendarEvents} onSelectEvent={this.onSelectEvent} />
                                    )}
                                </React.Fragment>
                            ) : this.props.events.length === 0 ? (
                                <Typography variant="h2">No Events.</Typography>
                            ) : (
                                <Typography variant="h2">No Matching Events</Typography>
                            )
                        ) : (
                            <Box py={2}>
                                <Loading />
                            </Box>
                        )}
                    </Box>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts[0],
    filters: state.eventFilters,
    events: state.events.events
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id)),
    startGetEvent: (id) => dispatch(startGetEvent(id)),
    setEvents: (events) => dispatch(setEvents(events)),
    resetEventFilters: () => dispatch(resetEventFilters())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewPostEventsPage);
