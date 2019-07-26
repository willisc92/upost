import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { PolaroidHeader, PolaroidBody, PolaroidSubHeader, useStyles } from "../components/PolaroidComponents";

export const ChannelListItem = ({ channel, selected, pathName, inHorizontalMenu }) => {
    const classes = useStyles();

    return (
        <div className={inHorizontalMenu ? `menu-item ${selected ? "active" : ""}` : ""}>
            <Link
                className="link"
                to={{
                    pathname: pathName,
                    state: { channel }
                }}
            >
                <Card className={classes.card}>
                    <CardActionArea className={classes.cardActionArea}>
                        <CardContent>
                            <PolaroidHeader header={channel.channel_name} />
                            {channel.deleted_flag && (
                                <PolaroidSubHeader
                                    subheader={`Deleted ${moment(channel.deletion_date).format("ddd, MMM D YYYY")}`}
                                />
                            )}
                            <PolaroidBody body={channel.channel_description} />
                            <PolaroidSubHeader subheader="Created:" />
                            <PolaroidBody body={moment(channel.creation_date).format("MMMM Do YYYY")} />
                            <PolaroidSubHeader subheader="Updated:" />
                            <PolaroidBody body={moment(channel.last_updated).format("MMMM Do YYYY, h:mm a")} />
                        </CardContent>
                    </CardActionArea>
                </Card>
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
                    inHorizontalMenu
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
                inHorizontalMenu
            />
        );
    });
