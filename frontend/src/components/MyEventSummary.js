import React from "react";
import { Link } from "react-router-dom";
import DateRangeTag from "../components/DateRangeTag";
import moment from "moment";

export const MyEventSummary = ({ event, pathName, selected, readOnly }) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
            <Link
                className={readOnly ? "polaroid__inactive" : "polaroid"}
                to={{
                    pathname: pathName,
                    state: { event }
                }}
            >
                <div>
                    <h3 className="polaroid__title">
                        {event.event_title}
                        {event.deleted_flag && (
                            <span className="polaroid__sub_title">
                                {" "}
                                (Deleted {moment(event.deletion_date).format("ddd, MMM D YYYY")})
                            </span>
                        )}
                    </h3>
                    <p className="polaroid__description">{event.event_description}</p>
                    <DateRangeTag startDate={event.planned_start_date} endDate={event.planned_end_date} />
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
            />
        );
    });
