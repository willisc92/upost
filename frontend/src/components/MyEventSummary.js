import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const MyEventSummary = ({ post_picture, event, pathName, selected }) => {
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
                    <img className="polaroid__image" src={post_picture} />
                    <p className="polaroid__description">{event.description}</p>
                    <p className="polaroid__description">
                        Start Date: {moment(event.planned_start_date).format("llll")}
                    </p>
                    <p className="polaroid__description">End Date: {moment(event.planned_end_date).format("llll")}</p>
                </div>
            </Link>
        </div>
    );
};

export default MyEventSummary;

export const MyEventMenu = (list, selected, post_picture) =>
    list.map((el) => {
        return (
            <MyEventSummary
                post_picture={post_picture}
                event={el}
                pathName={`/myEvents/${el.event_id}/edit`}
                key={el.event_id}
                selected={selected}
            />
        );
    });
