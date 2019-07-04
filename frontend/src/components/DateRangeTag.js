import React from "react";
import moment from "moment";

const DateRangeTag = (props) => {
    const startDate = moment(props.startDate);
    const endDate = moment(props.endDate);

    if (startDate.isSame(endDate, "day")) {
        return (
            <div>
                <p>Day: {startDate.format("ddd, MMM D YYYY")}</p>
                <p>Start Time: {startDate.format("h:mm a")}</p>
                <p>End Time: {endDate.format("h:mm a")}</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>Start: {startDate.format("ddd, MMM D YYYY, h:mm a")}</p>
                <p>End: {endDate.format("ddd, MMM D YYYY, h:mm a")}</p>
            </div>
        );
    }
};

export default DateRangeTag;
