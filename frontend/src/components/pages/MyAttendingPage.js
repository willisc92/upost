import React from "react";
import { connect } from "react-redux";
import { clearEvents, getAttendingEvents } from "../../actions/events";
import { getVisibleEvents } from "../../selectors/myEvents";
import { resetEventFilters } from "../../actions/event_filters";
import EventSummary from "../MyEventSummary";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";

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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Events You are Registered to Attend</h1>
                        <div className="page-header__actions">
                            <EventFilterSelector foodSpecific={false} />
                        </div>
                    </div>
                </div>

                <div className="content-container">
                    {events ? (
                        <div className="polaroid__container">
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
                                <h1>You are not registered to any events.</h1>
                            ) : (
                                <h1>No Matching Events</h1>
                            )}
                        </div>
                    ) : (
                        <div> Loading... </div>
                    )}
                </div>
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
