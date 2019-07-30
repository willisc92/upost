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

class ViewPostEventsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    componentDidMount() {
        const post_id = parseInt(this.props.match.params.id);

        // check to see if current post in store matches given id
        if (!!this.props.post && this.props.post.post_id === post_id) {
            this.props.setEvents(this.props.post.post_events);
        } else {
            // load post from API
            this.props.clearPosts();
            this.props
                .startGetPost(post_id)
                .then((res) => {
                    if (res.data[0].deleted_flag) {
                        this.props.history.push("/");
                    } else {
                        this.props.startGetEvent(post_id);
                    }
                })
                .catch((err) => {
                    console.log("error in getting post information", JSON.stringify(err, null, 2));
                });
        }
    }

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
                    </Container>
                </Box>
                <Box paddingTop={2}>
                    <Container fixed>
                        <div className="polaroid__container">
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
                        </div>
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
