import { getFreeFoodEvents } from "../../actions/events";
import { setHasIncentiveFilter, setIncentiveTypeFilter, setDietOptionsFilter } from "../../actions/event_filters";
import React from "react";
import { connect } from "react-redux";
import EventSummary from "../MyEventSummary";
import { Link } from "react-router-dom";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import { getVisibleEvents } from "../../selectors/myEvents";

export class FreeFoodPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props
            .getFreeFoodEvents()
            .then(() => {
                this.props.dispatch(setHasIncentiveFilter(true));
                this.props.dispatch(setIncentiveTypeFilter("Food"));
                this.props.dispatch(setDietOptionsFilter(""));
            })
            .catch((err) => console.log(JSON.stringify(err, null, 2)));
    }

    render() {
        const events = !!this.props.events && getVisibleEvents(this.props.events, this.props.filters, false);
        return (
            events && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Ongoing/Future Free Food Events in Your Communities</h1>
                            <div className="page-header__actions">
                                <EventFilterSelector foodSpecific={true} />
                            </div>
                        </div>
                    </div>

                    <div className="content-container">
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
                            ) : (
                                <h1>
                                    There are no ongoing or upcoming free food events in your communities. Please check
                                    again later or{" "}
                                    <span>
                                        <Link className="link__inline" to="/communities">
                                            click here to edit your communities.
                                        </Link>
                                    </span>
                                </h1>
                            )}
                        </div>
                    </div>
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
