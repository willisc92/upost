import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const EventSummary = ({ event, pathName }) => {
    return (
        <Link
            className="polaroid"
            to={{
                pathname: pathName,
                state: { event }
            }}
        >
            <div>
                <h3 className="polaroid__title">{event.event_title}</h3>
                <p className="polaroid__description">{event.event_description}</p>
                <p className="polaroid__description">
                    {moment(event.planned_start_date).format("MMMM Do YYYY")} -
                    {" " + moment(event.planned_end_date).format("MMMM Do YYYY")}
                </p>
            </div>
        </Link>
    );
};

export default EventSummary;
