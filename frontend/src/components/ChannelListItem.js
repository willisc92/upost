import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const ChannelListItem = ({
    channel_id,
    channel_description,
    creation_date,
    channel_name,
    selected,
    pathName
}) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
            <Link
                className="polaroid"
                to={{
                    pathname: pathName,
                    state: { channel_id, channel_description, creation_date, channel_name }
                }}
            >
                <div className="polaroid__text-wrapper">
                    <h3 className="polaroid__title">{channel_name}</h3>
                    <p className="polaroid__description">{channel_description}</p>
                    <p className="polaroid__description">
                        Creation Date: {moment(creation_date).format("MMMM Do YYYY")}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ChannelListItem;

export const BrowseChannelsMenu = (list, selected) =>
    list
        .filter((el) => !el.deleted_flag)
        .map((el) => {
            const { channel_id, channel_description, creation_date, channel_name } = el;

            return (
                <ChannelListItem
                    channel_id={channel_id}
                    channel_description={channel_description}
                    creation_date={creation_date}
                    channel_name={channel_name}
                    key={channel_id}
                    selected={selected}
                    pathName={`/channel/${channel_id}`}
                />
            );
        });

export const MyChannelsMenu = (list, selected) =>
    list.map((el) => {
        const { channel_id, channel_description, creation_date, channel_name } = el;

        return (
            <ChannelListItem
                channel_id={channel_id}
                channel_description={channel_description}
                creation_date={creation_date}
                channel_name={channel_name}
                key={channel_id}
                selected={selected}
                pathName={`/myChannels/${channel_id}`}
            />
        );
    });
