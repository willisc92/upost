import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

export const useStyles = makeStyles({
    media: {
        height: 150
    },
    card: {
        width: 250,
        margin: 10
    },
    cardActionArea: {
        padding: 10
    }
});

export const PolaroidHeader = ({ header }) => {
    return (
        <Typography variant="h5" component="h1">
            {header}
        </Typography>
    );
};

export const PolaroidSubHeader = ({ subheader }) => {
    return (
        <Typography variant="h6" component="h2">
            {subheader}
        </Typography>
    );
};

export const PolaroidBody = ({ body }) => {
    return (
        <Typography variant="body1" component="p">
            {body}
        </Typography>
    );
};

export const PolaroidImage = ({ image }) => {
    const classes = useStyles();
    return (
        <CardMedia className={classes.media} image={!!image ? image : CDNLink + "/dist/images/polaroid_default.png"} />
    );
};
