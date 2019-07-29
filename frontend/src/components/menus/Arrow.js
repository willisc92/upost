import React from "react";
import IconButton from "@material-ui/core/IconButton";

const Arrow = (icon) => {
    return (
        <IconButton color="primary">
            <i className="material-icons md-48">{icon}</i>
        </IconButton>
    );
};

export const ArrowLeft = Arrow("arrow_left");
export const ArrowRight = Arrow("arrow_right");
