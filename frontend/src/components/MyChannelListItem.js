import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const MyChannelListItem = ({ channel_id, channel_description, creation_date, channel_name, selected }) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
            <div className="list-box">
                <Link
                    className="list-item--scrollable"
                    to={{
                        pathname: `/myChannels/${channel_id}`,
                        state: { channel_id, channel_description, creation_date, channel_name }
                    }}
                >
                    <div>
                        <h3 className="list-item__title">{channel_name}</h3>
                        <p className="list-item__sub-title">{channel_description}</p>
                        <p className="list-item__sub-title">
                            Creation Date: {moment(creation_date).format("MMMM Do YYYY")}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MyChannelListItem;

export const MyChannelsMenu = (list, selected) =>
    list.map((el) => {
        const { channel_id, channel_description, creation_date, channel_name } = el;

        return (
            <MyChannelListItem
                channel_id={channel_id}
                channel_description={channel_description}
                creation_date={creation_date}
                channel_name={channel_name}
                key={channel_id}
                selected={selected}
            />
        );
    });
