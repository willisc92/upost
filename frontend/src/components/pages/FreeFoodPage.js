import { getFreeFoodEvents } from "../../actions/events";
import {
    setHasIncentiveFilter,
    setIncentiveTypeFilter,
    setDietOptionsFilter,
    resetEventFilters
} from "../../actions/event_filters";
import React from "react";
import { connect } from "react-redux";
import EventSummary from "../MyEventSummary";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import { getVisibleEvents } from "../../selectors/myEvents";
import { HelpToolTip } from "../HelpTooltip";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { MyCalendar } from "../Calendar";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

export class FreeFoodPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: "list"
        };
    }

    componentDidMount() {
        this.props.resetEventFilters();

        let promises = [];
        promises.push(this.props.setHasIncentiveFilter("all"));
        promises.push(this.props.setIncentiveTypeFilter("Food"));
        promises.push(this.props.setDietOptionsFilter(""));

        Promise.all(promises)
            .then(() => {
                this.props
                    .getFreeFoodEvents()
                    .then(() => {})
                    .catch((err) => console.log(err));
            })
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
            events && (
                <div>
                    <Box bgcolor="secondary.main" py={3}>
                        <Container maxWidth="xl">
                            <Typography variant="h1" gutterBottom>
                                Food Mood
                                <HelpToolTip
                                    jsx={
                                        <React.Fragment>
                                            <Typography variant="caption">
                                                Here you can see all ongoing or upcoming events with the free food perk
                                                that are listed within your communities!
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
                            <EventFilterSelector foodSpecific={true} listView={this.state.view === "list"} />
                        </Container>
                    </Box>

                    <Container maxWidth="xl">
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
                            ) : (
                                <Typography variant="h2">
                                    There are no ongoing or upcoming free food events in your communities. Please check
                                    again later or{" "}
                                    <Typography variant="inherit" color="primary" display="inline">
                                        <ButtonBase
                                            onClick={() => {
                                                this.props.history.push("/communities");
                                            }}
                                        >
                                            click here to edit your communities.
                                        </ButtonBase>
                                    </Typography>
                                </Typography>
                            )}
                        </Box>
                    </Container>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events.events,
    filters: state.eventFilters
});

const mapDispatchToProps = (dispatch) => ({
    getFreeFoodEvents: () => dispatch(getFreeFoodEvents()),
    setHasIncentiveFilter: (hasIncentive) => dispatch(setHasIncentiveFilter(hasIncentive)),
    setIncentiveTypeFilter: (incentiveType) => dispatch(setIncentiveTypeFilter(incentiveType)),
    setDietOptionsFilter: (dietOption) => dispatch(setDietOptionsFilter(dietOption)),
    resetEventFilters: () => dispatch(resetEventFilters())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FreeFoodPage);
