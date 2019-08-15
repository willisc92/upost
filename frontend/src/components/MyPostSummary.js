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

export const MyPostSummary = ({ post, pathName, selected, readOnly, inHorizontalMenu }) => {
    const classes = useStyles();

    return (
        <div className={inHorizontalMenu ? `menu-item ${selected ? "active" : ""}` : ""}>
            <Link
                className="link"
                to={{
                    pathname: pathName,
                    state: { post }
                }}
            >
                <Card className={classes.card} style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }}>
                    <CardActionArea className={classes.cardActionArea}>
                        <PolaroidImage image={post.picture} />
                        <CardContent>
                            <PolaroidHeader header={post.post_title} />
                            {post.deleted_flag && (
                                <PolaroidSubHeader
                                    color="primary"
                                    subheader={`(Deleted ${moment(post.deletion_date).format("l")})`}
                                />
                            )}
                            <PolaroidBody body={post.post_description} />
                            <PolaroidSubHeader subheader="Created:" />
                            <PolaroidBody body={moment(post.post_timestamp).format("MMMM Do YYYY")} />
                            <PolaroidSubHeader subheader="Updated:" />
                            <PolaroidBody body={moment(post.last_updated).format("MMMM Do YYYY, h:mm a")} />
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </div>
    );
};

export default MyPostSummary;

export const BrowsePostMenu = (list, selected, deleted_flag) =>
    list
        .filter((el) => el.deleted_flag === deleted_flag)
        .map((el) => {
            return (
                <MyPostSummary
                    post={el}
                    pathName={`/post/${el.post_id}`}
                    key={el.post_id}
                    selected={selected}
                    inHorizontalMenu
                />
            );
        });
