import React from "react";
import { connect } from "react-redux";
import { setEvents } from "../actions/events";
import { Link } from "react-router-dom";
import DateRangeTag from "../components/DateRangeTag";
import moment from "moment";

export class MyEventSummary extends React.Component {
    onClick = () => {
        this.props.setEvents(this.props.event);
    };

    render() {
        const event = this.props.event;
        const pathName = this.props.pathName;
        const selected = this.props.selected;
        const readOnly = this.props.readOnly;
        const inHorizontalMenu = this.props.inHorizontalMenu;
        const hasIncentive = !!event.event_incentive;
        const hasDifferentIncentiveTimes =
            hasIncentive &&
            (event.event_incentive.planned_start_date !== event.planned_start_date ||
                event.event_incentive.planned_end_date !== event.planned_end_date);

        return (
            <div className={inHorizontalMenu ? `menu-item ${selected ? "active" : ""}` : ""}>
                <Link
                    className={readOnly ? "polaroid__inactive" : "polaroid"}
                    to={{
                        pathname: pathName
                    }}
                    onClick={this.onClick}
                >
                    <div className="polaroid__text-wrapper">
                        <h1 className="polaroid__title">{event.event_title}</h1>
                        {event.deleted_flag && (
                            <h2 className="polaroid__sub_title">
                                {" "}
                                (Deleted {moment(event.deletion_date).format("ddd, MMM D YYYY")})
                            </h2>
                        )}
                        <h3 className="polaroid__description">{event.event_description}</h3>
                        <h2 className="polaroid__sub_title">
                            Event {hasIncentive && !hasDifferentIncentiveTimes && "and Incentive "}From:
                        </h2>
                        <DateRangeTag startDate={event.planned_start_date} endDate={event.planned_end_date} />
                        {hasDifferentIncentiveTimes && <h2 className="polaroid__sub_title">Incentives Valid from: </h2>}
                        {hasDifferentIncentiveTimes && (
                            <DateRangeTag
                                startDate={event.event_incentive.planned_start_date}
                                endDate={event.event_incentive.planned_end_date}
                            />
                        )}
                        {hasIncentive && (
                            <p className="polaroid__description">
                                Incentive Type(s): {event.event_incentive.incentive_type.join(", ")}
                            </p>
                        )}
                        <h2 className="polaroid__sub_title">Created:</h2>
                        <p className="polaroid__description">{moment(event.creation_date).format("MMMM Do YYYY")} </p>
                        <h2 className="polaroid__sub_title">Updated:</h2>
                        <p className="polaroid__description">
                            {moment(event.last_updated).format("MMMM Do YYYY, h:mm a")}
                        </p>
                        <h2 className="polaroid__sub_title">Capacity:</h2>
                        <p className="polaroid__description">{`${event.capacity_status}/${event.capacity}`}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setEvents: (event) => dispatch(setEvents(event))
});

export default connect(
    undefined,
    mapDispatchToProps
)(MyEventSummary);

export const MyEventMenu = (list, selected, readOnly) =>
    list.map((el) => {
        return (
            <MyEventSummary
                event={el}
                pathName={`/myPosts/${el.post}/events/${el.event_id}/edit`}
                key={el.event_id}
                selected={selected}
                readOnly={readOnly}
                inHorizontalMenu
            />
        );
    });

export const BrowseEventMenu = (list, selected, readOnly = false) =>
    list.map((el) => {
        return (
            <MyEventSummary
                event={el}
                pathName={`/event/${el.event_id}`}
                key={el.event_id}
                selected={selected}
                readOnly={readOnly}
                inHorizontalMenu
            />
        );
    });
