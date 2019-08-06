import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import SvgIcon from "@material-ui/core/SvgIcon";
import zIndex from "@material-ui/core/styles/zIndex";

export const useStyles = makeStyles((theme) => ({
    media: {
        height: 150,
        backgroundColor: "black"
    },
    card: {
        width: 250,
        margin: 10
    },
    cardActionArea: {
        padding: 7
    },
    icon: {
        width: 50,
        height: 50,
        position: "absolute",
        zIndex: 1,
        marginLeft: 225
    }
}));

export const PolaroidHeader = ({ header }) => {
    return <Typography variant="h6">{header}</Typography>;
};

export const PolaroidSubHeader = ({ subheader }) => {
    return <Typography variant="h6">{subheader}</Typography>;
};

export const PolaroidBody = ({ body }) => {
    return <Typography variant="body2">{body}</Typography>;
};

export const PolaroidImage = ({ image }) => {
    const classes = useStyles();
    return (
        <CardMedia className={classes.media} image={!!image ? image : CDNLink + "/dist/images/polaroid_default.png"} />
    );
};

export const PinnedSVG = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 60 60">
            <circle cx="29.1" cy="30.9" r="28.6" />
            <path
                d="M18.41 42.28l8.807-6.974 6.492 6.942c.378-.346 3.031-1.861-.257-7.296 1.17-1.405 6.654-7.746 6.654-7.746l5.239.193v-2.314L34.93 14.928l-2.154.996.097 5.079-6.814 5.882c-2.86-1.295-5.304-1.38-7.393.064l6.236 6.203z"
                fill="#fff"
                stroke="#fff"
            />
        </SvgIcon>
    );
};

export const UnpinnedSVG = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 60 60">
            <circle cx="29.1" cy="30.9" r="28.6" />
            <path
                d="M26.782 21.564v7.117H19.5v4.88h7.28v7.366h4.388v-7.365h7.613V28.68h-7.613v-7.117z"
                fill="#fff"
                stroke="#fff"
            />
        </SvgIcon>
    );
};
