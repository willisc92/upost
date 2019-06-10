import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const MyChannelListItem = ({ channel_id, channel_description, creation_date, channel_name }) => {
    return (
        <Link
            className="list-item"
            to={{
                pathname: `/myChannels/${channel_id}`,
                state: { channel_id, channel_description, creation_date, channel_name }
            }}
        >
            <div>
                <h3 className="list-item__title">{channel_name}</h3>
                <p className="list-item__sub-title">{channel_description}</p>
                <p className="list-item__sub-title">Creation Date: {moment(creation_date).format("MMMM Do YYYY")}</p>
            </div>
        </Link>
    );
};

export default MyChannelListItem;
