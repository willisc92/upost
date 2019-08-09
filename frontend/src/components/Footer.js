import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { FacebookIcon, EmailIcon, TwitterIcon } from "react-share";
import { SocialIcon } from "react-social-icons";

const useStyles = makeStyles((theme) => ({
    contact: {
        backgroundColor: theme.palette.secondary.dark,
        flexGrow: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        color: "white"
    },
    privacy: {
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-around",
        color: "white"
    },
    row: {
        display: "flex"
    },
    spacing: {
        marginLeft: 5,
        marginRight: 5
    }
}));

const iconStyles = {
    bgColor: "#ee0000",
    fgColor: "white"
};

const Footer = (props) => {
    const classes = useStyles();

    return (
        <Box {...props}>
            <Box className={classes.contact}>
                <Box className={classes.row}>
                    <Box className={classes.spacing}>
                        <SocialIcon url="https://www.facebook.com/" network="facebook" {...iconStyles} />
                    </Box>
                    <Box className={classes.spacing}>
                        <SocialIcon url="https://twitter.com/?lang=en" network="twitter" {...iconStyles} />
                    </Box>
                    <Box className={classes.spacing}>
                        <SocialIcon url="https://www.instagram.com/" network="instagram" {...iconStyles} />
                    </Box>
                    <Box className={classes.spacing}>
                        <SocialIcon url="mailto:support@upostwebsite.com" network="mailto" {...iconStyles} />
                    </Box>
                </Box>
            </Box>
            <Box className={classes.privacy}>
                <Box className={classes.row}>
                    <Box className={classes.spacing}>
                        <Typography variant="body1">Privacy Policy</Typography>
                    </Box>
                    <Typography variant="body1">|</Typography>
                    <Box className={classes.spacing}>
                        <Typography variant="body1">Contact Us</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
