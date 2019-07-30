import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {
    PolaroidHeader,
    PolaroidBody,
    PolaroidImage,
    useStyles,
    PinnedSVG,
    UnpinnedSVG
} from "../components/PolaroidComponents";

export const CommunityCard = (props) => {
    const onClick = () => {
        props.changeIsSelected(props.community.community_name);
    };

    const classes = useStyles();

    return (
        <div className="polaroid" onClick={onClick}>
            {props.community.isSelected ? (
                <PinnedSVG className={classes.icon} color="primary" />
            ) : (
                <UnpinnedSVG className={classes.icon} color="primary" />
            )}
            <Card className={classes.card} style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }}>
                <CardActionArea className={classes.cardActionArea}>
                    <PolaroidImage image={props.community.image} />
                    <CardContent>
                        <PolaroidHeader header={props.community.community_name} />
                        <PolaroidBody body={props.community.description} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default CommunityCard;
