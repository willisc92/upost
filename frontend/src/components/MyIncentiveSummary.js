import React from "react";
import { Link } from "react-router-dom";
import DateRangeTag from "../components/DateRangeTag";
import moment from "moment";

export const MyIncentiveSummary = ({ incentive, pathName, selected }) => {
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
                    <h3 className="polaroid__title">
                        {incentive.ip_description}
                        {incentive.deleted_flag && (
                            <span className="polaroid__sub_title">
                                {" "}
                                (Deleted {moment(incentive.deletion_date).format("ddd, MMM D YYYY")})
                            </span>
                        )}
                    </h3>
                    <p className="polaroid__description">Type: {incentive.incentive_type}</p>
                    {!!incentive.planned_start_date && !!incentive.planned_end_date && (
                        <DateRangeTag startDate={event.planned_start_date} endDate={event.planned_end_date} />
                    )}
                </div>
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
