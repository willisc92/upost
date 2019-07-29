import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const MenuHeader = (text) => (
    <Box fontWeight="fontWeightBold">
        <Box py={3} my={1} boxShadow={3} px={2} bgcolor="secondary.light">
            <Typography variant="h2" color="primary">
                {text}
            </Typography>
        </Box>
    </Box>
);

export default MenuHeader;
