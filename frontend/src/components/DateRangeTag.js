import React from "react";
import moment from "moment";

const DateRangeTag = (props) => {
    const startDate = moment(props.startDate);
    const endDate = moment(props.endDate);
    return (
        <p>
            {startDate.isSame(endDate, "day")
                ? `${startDate.format("MMMM Do YYYY, h:mm a")} - ${endDate.format("h:mm a")}`
                : `${startDate.format("MMMM Do YYYY, h:mm a")} - ${endDate.format("MMMM Do YYYY, h:mm a")}`}
        </p>
    );
};

export default DateRangeTag;
