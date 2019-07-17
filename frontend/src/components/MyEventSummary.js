import React from "react";
import { Link } from "react-router-dom";
import DateRangeTag from "../components/DateRangeTag";
import moment from "moment";

export const MyEventSummary = ({ event, pathName, selected, readOnly, inHorizontalMenu }) => {
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
                    pathname: pathName,
                    state: { event }
                }}
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
                        {moment(event.last_updated).format("MMMM Do YYYY, h:mm a")}{" "}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default MyEventSummary;

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
