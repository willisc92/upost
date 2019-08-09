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
import { HelpToolTip } from "../HelpTooltip";
import { MyCalendar } from "../Calendar";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

class MyAttendingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: "list"
        };
    }

    componentWillMount() {
        this.props.clearEvents();
        this.props.resetEventFilters();

        this.props
            .getAttendingEvents()
            .then(() => {})
            .catch((err) => console.log(err));
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
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" gutterBottom>
                            Events I'm Attending
                            <HelpToolTip
                                jsx={
                                    <React.Fragment>
                                        <Typography variant="caption">
                                            Here you can see all events you have registered to attend!
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
                        <EventFilterSelector foodSpecific={false} listView={this.state.view === "list"} />
                    </Container>
                </Box>

                <Container maxWidth="xl">
                    {events ? (
                        <Box>
                            {events.length > 0 ? (
                                <React.Fragment>
                                    {this.state.view === "list" && (
                                        <Box display="flex" flexWrap="wrap" py={2}>
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
