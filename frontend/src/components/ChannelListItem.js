import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const ChannelListItem = ({ channel, selected, pathName }) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
            <Link
                className="polaroid"
                to={{
                    pathname: pathName,
                    state: { channel }
                }}
            >
                <div className="polaroid__text-wrapper">
                    <h3 className="polaroid__title">
                        {channel.channel_name}{" "}
                        {channel.deleted_flag && (
                            <span className="polaroid__sub_title">
                                {" "}
                                (Deleted {moment(channel.deletion_date).format("ddd, MMM D YYYY")})
                            </span>
                        )}
                    </h3>
                    <p className="polaroid__description">{channel.channel_description}</p>
                    <p className="polaroid__description">
                        Creation Date: {moment(channel.creation_date).format("MMMM Do YYYY")}
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
            return (
                <ChannelListItem
                    channel={el}
                    key={el.channel_id}
                    selected={selected}
                    pathName={`/channel/${el.channel_id}`}
                />
            );
        });

export const MyChannelsMenu = (list, selected) =>
    list.map((el) => {
        return (
            <ChannelListItem
                channel={el}
                key={el.channel_id}
                selected={selected}
                pathName={`/myChannels/${el.channel_id}`}
            />
        );
    });
