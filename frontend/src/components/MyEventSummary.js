import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DateRangeTag from "../components/DateRangeTag";

export const MyEventSummary = ({ event, pathName, selected }) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
            <Link
                className="polaroid"
                to={{
                    pathname: pathName,
                    state: { event }
                }}
            >
                <div>
                    <h3 className="polaroid__title">{event.event_title}</h3>
                    <p className="polaroid__description">{event.description}</p>
                    <DateRangeTag startDate={event.planned_start_date} endDate={event.planned_end_date} />
                    {/* <p className="polaroid__description">Start: {moment(event.planned_start_date).format("llll")}</p>
                    <p className="polaroid__description">End: {moment(event.planned_end_date).format("llll")}</p> */}
                </div>
            </Link>
        </div>
    );
};

export default MyEventSummary;

export const MyEventMenu = (list, selected) =>
    list.map((el) => {
        return (
            <MyEventSummary
                event={el}
                pathName={`/myPosts/${el.post}/events/${el.event_id}/edit`}
                key={el.event_id}
                selected={selected}
            />
        );
    });
