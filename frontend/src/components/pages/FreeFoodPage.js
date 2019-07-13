import { getFreeFoodEvents } from "../../actions/events";
import React from "react";
import { connect } from "react-redux";
import EventSummary from "../MyEventSummary";
import { Link } from "react-router-dom";

export class FreeFoodPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props
            .getFreeFoodEvents()
            .then(() => {})
            .catch((err) => console.log(JSON.stringify(err, null, 2)));
    }

    render() {
        const events = !!this.props.events && this.props.events;

        return (
            events && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Ongoing/Future Free Food Events in Your Communities</h1>
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
    events: state.events.events
});

const mapDispatchToProps = (dispatch) => ({
    getFreeFoodEvents: () => dispatch(getFreeFoodEvents())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FreeFoodPage);
