import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startGetEvent, setEvents } from "../../actions/events";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import { getVisibleEvents } from "../../selectors/myEvents";
import EventSummary from "../MyEventSummary";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { getCurrentUser } from "../../actions/auth";
import Button from "@material-ui/core/Button";

class ViewPostEventsPage extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            selected: 0,
            isOwner: false
        };
    }

    componentDidMount() {
        this._isMounted = true;

        const post_id = parseInt(this.props.match.params.id);

        // check to see if current post in store matches given id
        if (!!this.props.post && this.props.post.post_id === post_id) {
            this.props.setEvents(this.props.post.post_events);

            getCurrentUser().then((user_res) => {
                const isOwner = user_res.data.username === this.props.post.user;

                if (this._isMounted) {
                    this.setState(() => ({
                        isOwner
                    }));
                }
            });
        } else {
            // load post from API
            this.props.clearPosts();
            this.props
                .startGetPost(post_id)
                .then((res) => {
                    getCurrentUser()
                        .then((user_res) => {
                            const isOwner = user_res.data.username === res.data[0].user;

                            if (this._isMounted) {
                                this.setState(() => ({
                                    isOwner
                                }));
                            }

                            if (res.data[0].deleted_flag) {
                                this.props.history.push("/");
                            } else {
                                this.props
                                    .startGetEvent(post_id)
                                    .then(() => {})
                                    .catch((err) => console.log(err));
                            }
                        })
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

    returnEditPosts = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/edit`);
    };

    addNewEvent = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/addEvent`);
    };

    render() {
        const events = !!this.props.events && getVisibleEvents(this.props.events, this.props.filters, false);
        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container fixed>
                        {!!this.props.post && (
                            <React.Fragment>
                                <Typography variant="h1" display="inline">
                                    Events for
                                </Typography>
                                <Typography variant="h1" color="primary" display="inline">
                                    {" "}
                                    {this.props.post.post_title}
                                </Typography>
                            </React.Fragment>
                        )}
                        <Box marginTop={2}>
                            <EventFilterSelector />
                        </Box>
                        {this.state.isOwner && (
                            <div>
                                <Button color="primary" variant="contained" onClick={this.addNewEvent}>
                                    Add an Event
                                </Button>{" "}
                                <Button color="primary" variant="contained" onClick={this.returnEditPosts}>
                                    Edit Post
                                </Button>{" "}
                                {!!events && events.length > 0 && (
                                    <Button color="primary" variant="contained" onClick={this.clearAllEvents}>
                                        Delete All Events
                                    </Button>
                                )}
                            </div>
                        )}
                    </Container>
                </Box>
                <Box paddingTop={2}>
                    <Container fixed>
                        <Box display="flex" flexWrap="wrap">
                            {!!events &&
                                events.map((event) => {
                                    return (
                                        <EventSummary
                                            key={event.event_id}
                                            event={event}
                                            pathName={`/event/${event.event_id}`}
                                        />
                                    );
                                })}
                        </Box>
                    </Container>
                </Box>
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
    setEvents: (events) => dispatch(setEvents(events))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewPostEventsPage);
