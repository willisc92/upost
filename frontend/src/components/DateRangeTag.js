import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

const DateRangeTag = (props) => {
    const startDate = moment(props.startDate);
    const endDate = moment(props.endDate);

    if (startDate.isSame(endDate, "day")) {
        return (
            <div>
                <Typography variant="body1" component="p">
                    Day: {startDate.format("ddd, MMM D YYYY")}
                </Typography>
                <Typography variant="body1" component="p">
                    Start Time: {startDate.format("h:mm a")}
                </Typography>
                <Typography variant="body1" component="p">
                    End Time: {endDate.format("h:mm a")}
                </Typography>
                {/* <p>Day: {startDate.format("ddd, MMM D YYYY")}</p>
                <p>Start Time: {startDate.format("h:mm a")}</p>
                <p>End Time: {endDate.format("h:mm a")}</p> */}
            </div>
        );
    } else {
        return (
            <div>
                <Typography variant="body1" component="p">
                    Start: {startDate.format("ddd, MMM D YYYY, h:mm a")}
                </Typography>
                <Typography variant="body1" component="p">
                    End: {endDate.format("ddd, MMM D YYYY, h:mm a")}
                </Typography>
                {/* <p>Start: {startDate.format("ddd, MMM D YYYY, h:mm a")}</p>
                <p>End: {endDate.format("ddd, MMM D YYYY, h:mm a")}</p> */}
            </div>
        );
    }
};

export default DateRangeTag;
