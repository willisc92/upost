import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { WhiteButton } from "../components/Buttons";
import Box from "@material-ui/core/Box";

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
            <WhiteButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <i className="material-icons">perm_identity</i>
                My Account
            </WhiteButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <Button variant="text" onClick={() => props.history.push("/interests")}>
                        <Box paddingRight={0.5}>
                            <i className="material-icons">favorite</i>
                        </Box>
                        My Interests
                    </Button>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Button variant="text" onClick={() => props.history.push("/communities")}>
                        <Box paddingRight={0.5}>
                            <i className="material-icons">location_city</i>
                        </Box>
                        My Communities
                    </Button>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};
