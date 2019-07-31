import React from "react";
import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";

export class HelpToolTip extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tooltip title={this.props.html} placement="right">
                <IconButton color="primary">
                    <HelpIcon />
                </IconButton>
            </Tooltip>
        );
    }
}
