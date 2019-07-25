import React from "react";
import { Link } from "react-router-dom";
import DateRangeTag from "../components/DateRangeTag";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { PolaroidHeader, PolaroidBody, PolaroidSubHeader, useStyles } from "../components/PolaroidComponents";

export const MyIncentiveSummary = ({ incentive, pathName, selected }) => {
    const classes = useStyles();
    /*
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
            <Link
                className="polaroid"
                to={{
                    pathname: pathName,
                    state: { incentive }
                }}
            >
                <div>
                    <h1 className="polaroid__title">{incentive.ip_description}</h1>
                    {incentive.deleted_flag && (
                        <h2 className="polaroid__sub_title">
                            {" "}
                            (Deleted {moment(incentive.deletion_date).format("ddd, MMM D YYYY")})
                        </h2>
                    )}
                    <p className="polaroid__description">Type: {incentive.incentive_type}</p>
                    {!!incentive.planned_start_date && !!incentive.planned_end_date && (
                        <DateRangeTag startDate={incentive.planned_start_date} endDate={incentive.planned_end_date} />
                    )}
                </div>
            </Link>
        </div>
    );
    */
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
            <Link
                className="link"
                to={{
                    pathname: pathName,
                    state: { incentive }
                }}
            >
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <PolaroidHeader header={incentive.ip_description} />
                            {incentive.deleted_flag && (
                                <PolaroidSubHeader
                                    subheader={`(Deleted ${moment(incentive.deletion_date).format("ddd, MMM D YYYY")})`}
                                />
                            )}
                            <PolaroidBody body={`Type: ${incentive.incentive_type}`} />
                            {!!incentive.planned_start_date && !!incentive.planned_end_date && (
                                <DateRangeTag
                                    startDate={incentive.planned_start_date}
                                    endDate={incentive.planned_end_date}
                                />
                            )}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </div>
    );
};

export default MyIncentiveSummary;

export const MyIncentiveMenu = (list, selected) =>
    list.map((el) => {
        let pathName;

        if (!!el.post) {
            pathName = `/myPosts/${el.post}/editIncentive`;
        } else if (!!el.event) {
            pathName = `/myEvents/${el.event}/editIncentive`;
        }

        return (
            <MyIncentiveSummary incentive={el} pathName={pathName} key={el.incentive_package_id} selected={selected} />
        );
    });
