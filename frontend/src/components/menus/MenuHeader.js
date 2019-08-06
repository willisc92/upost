import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const MenuHeader = (text) => (
    <Box py={1.5} my={1} boxShadow={1} px={2} bgcolor="secondary.main" fontWeight="fontWeightBold">
        <Typography variant="h2" color="primary">
            {text}
        </Typography>
    </Box>
);

export default MenuHeader;
