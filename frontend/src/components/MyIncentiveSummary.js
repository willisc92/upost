import React from "react";
import { Link } from "react-router-dom";
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
                    <h3 className="polaroid__title">{incentive.ip_description}</h3>
                    <p className="polaroid__description">
                        Start Date: {moment(incentive.planned_start_date).format("llll")}
                    </p>
                    <p className="polaroid__description">
                        End Date: {moment(incentive.planned_end_date).format("llll")}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default MyIncentiveSummary;

export const MyIncentiveMenu = (list, selected) =>
    list.map((el) => {
        return (
            <MyIncentiveSummary
                incentive={el}
                pathName={`/myPosts/${el.post}/incentives/${el.incentive_package_id}/edit`}
                key={el.incentive_package_id}
                selected={selected}
            />
        );
    });
