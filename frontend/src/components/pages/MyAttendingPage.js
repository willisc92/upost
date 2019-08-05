import React from "react";
import { connect } from "react-redux";
import { clearEvents, getAttendingEvents } from "../../actions/events";
import { getVisibleEvents } from "../../selectors/myEvents";
import { resetEventFilters } from "../../actions/event_filters";
import EventSummary from "../MyEventSummary";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class MyAttendingPage extends React.Component {
    componentWillMount() {
        this.props.clearEvents();
        this.props.resetEventFilters();

        this.props
            .getAttendingEvents()
            .then(() => {})
            .catch((err) => console.log(err));
    }

    render() {
        const events = !!this.props.events && getVisibleEvents(this.props.events, this.props.filters, false);

        return (
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" gutterBottom>
                            Events You are Registered to Attend
                        </Typography>
                        <EventFilterSelector foodSpecific={false} />
                    </Container>
                </Box>

                <Container maxWidth="xl">
                    {events ? (
                        <Box display="flex" flexWrap="flex" py={2}>
                            {events.length > 0 ? (
                                events.map((event) => {
                                    return (
                                        <EventSummary
                                            key={event.event_id}
                                            event={event}
                                            pathName={`/event/${event.event_id}`}
                                            inHorizontalMenu={false}
                                        />
                                    );
                                })
                            ) : this.props.events.length === 0 ? (
                                <Typography variant="h2">You are not registered to any events.</Typography>
                            ) : (
                                <Typography variant="h2">No Matching Events</Typography>
                            )}
                        </Box>
                    ) : (
                        <Typography> Loading... </Typography>
                    )}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events.events,
    filters: state.eventFilters
});

const mapDispatchToProps = (dispatch) => ({
    clearEvents: () => dispatch(clearEvents()),
    getAttendingEvents: () => dispatch(getAttendingEvents()),
    resetEventFilters: () => dispatch(resetEventFilters())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyAttendingPage);
