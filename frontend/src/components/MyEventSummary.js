import React from "react";
import { connect } from "react-redux";
import { setEvents } from "../actions/events";
import { Link } from "react-router-dom";
import DateRangeTag from "../components/DateRangeTag";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {
    PolaroidHeader,
    PolaroidBody,
    PolaroidSubHeader,
    PolaroidImage,
    useStyles
} from "../components/PolaroidComponents";

export const MyEventSummary = ({ event, pathName, selected, inHorizontalMenu, setEvents }) => {
    const onClick = () => {
        setEvents(event);
    };

    const hasIncentive = !!event.event_incentive;
    const hasDifferentIncentiveTimes =
        hasIncentive &&
        (event.event_incentive.planned_start_date !== event.planned_start_date ||
            event.event_incentive.planned_end_date !== event.planned_end_date);
    const classes = useStyles();

    return (
        <div className={inHorizontalMenu ? `menu-item ${selected ? "active" : ""}` : ""}>
            <Link
                className="link"
                to={{
                    pathname: pathName
                }}
                onClick={onClick}
            >
                <Card className={classes.card} style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }}>
                    <CardActionArea>
                        <PolaroidImage image={event.post_picture} />
                        <CardContent>
                            <PolaroidHeader header={event.event_title} />
                            {event.deleted_flag && (
                                <PolaroidSubHeader
                                    color="primary"
                                    subheader={`(Deleted ${moment(event.deletion_date).format("l")})`}
                                />
                            )}
                            <PolaroidBody body={event.event_description} />
                            {hasIncentive && !hasDifferentIncentiveTimes ? (
                                <PolaroidSubHeader subheader="Event and Incentive From:" />
                            ) : (
                                <PolaroidSubHeader subheader="Event From:" />
                            )}
                            <DateRangeTag startDate={event.planned_start_date} endDate={event.planned_end_date} />
                            {hasDifferentIncentiveTimes && <PolaroidSubHeader subheader="Incentives Valid from:" />}
                            {hasDifferentIncentiveTimes && (
                                <DateRangeTag
                                    startDate={event.event_incentive.planned_start_date}
                                    endDate={event.event_incentive.planned_end_date}
                                />
                            )}
                            {hasIncentive && (
                                <PolaroidBody
                                    body={`Incentive Type(s): ${event.event_incentive.incentive_type.join(", ")}`}
                                />
                            )}
                            <PolaroidSubHeader subheader="Capacity:" />
                            <PolaroidBody body={`${event.capacity_status}/${event.capacity}`} />
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setEvents: (event) => dispatch(setEvents(event))
});

export default connect(
    undefined,
    mapDispatchToProps
)(MyEventSummary);

export const BrowseEventMenu = (list, selected, deleted_flag) =>
    list
        .filter((el) => el.deleted_flag === deleted_flag)
        .map((el) => {
            return (
                <MyEventSummary
                    event={el}
                    pathName={`/event/${el.event_id}`}
                    key={el.event_id}
                    selected={selected}
                    inHorizontalMenu
                />
            );
        });
