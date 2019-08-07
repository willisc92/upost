import React from "react";
import { Link } from "react-router-dom";
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
                        <PolaroidImage image={channel.picture} />
                        <CardContent>
                            <PolaroidHeader header={channel.channel_name} />
                            {channel.deleted_flag && (
                                <PolaroidSubHeader
                                    color="primary"
                                    subheader={`Deleted ${moment(channel.deletion_date).format("l")}`}
                                />
                            )}
                            <PolaroidBody body={channel.channel_description} />
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

export const BrowseChannelsMenu = (list, selected, deleted_flag) =>
    list
        .filter((el) => el.deleted_flag === deleted_flag)
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
