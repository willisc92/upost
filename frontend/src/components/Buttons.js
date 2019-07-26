import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    whiteButton: {
        color: "white"
    },
    whiteRedButton: {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        margin: 5
    }
}));

const White = (WrappedComponent) => {
    const HOC = (props) => {
        const classes = useStyles();
        return <WrappedComponent {...props} className={classes.whiteButton} />;
    };

    return HOC;
};

const WhiteRed = (WrappedComponent) => {
    const HOC = (props) => {
        const classes = useStyles();
        return <WrappedComponent {...props} className={classes.whiteRedButton} />;
    };

    return HOC;
};

export const WhiteButton = White(Button);
export const WhiteRedButton = WhiteRed(Button);
