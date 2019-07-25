import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const MyAccountMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <i className="material-icons">perm_identity</i>
                My Account
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose} disableGutters>
                    <Button variant="text" onClick={() => props.history.push("/interests")} fullWidth>
                        <i className="material-icons">favorite</i>
                        My Interests
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose} disableGutters>
                    <Button variant="text" onClick={() => props.history.push("/communities")} fullWidth>
                        <i className="material-icons">location_city</i>
                        My Communities
                    </Button>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};
