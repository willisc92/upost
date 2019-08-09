import { getFreeFoodEvents } from "../../actions/events";
import { setHasIncentiveFilter, setIncentiveTypeFilter, setDietOptionsFilter } from "../../actions/event_filters";
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

export class FreeFoodPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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

    render() {
        const events = !!this.props.events && getVisibleEvents(this.props.events, this.props.filters, false);
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
                            </Typography>
                            <EventFilterSelector foodSpecific={true} />
                        </Container>
                    </Box>

                    <Container maxWidth="xl">
                        <Box display="flex" flexWrap="wrap" py={2}>
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
    setDietOptionsFilter: (dietOption) => dispatch(setDietOptionsFilter(dietOption))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FreeFoodPage);
