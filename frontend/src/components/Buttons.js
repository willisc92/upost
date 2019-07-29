import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    whiteButton: {
        color: "white"
    }
}));

const White = (WrappedComponent) => {
    const HOC = (props) => {
        const classes = useStyles();
        return <WrappedComponent {...props} className={classes.whiteButton} />;
    };

    return HOC;
};

export const WhiteButton = White(Button);
