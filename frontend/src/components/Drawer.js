import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles({
    list: {
        width: 250
    },
    paper: {
        background: "white"
    }
});

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (side, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = (side) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <Box py={2}>
                <Typography align="center" variant="h3">
                    MENU
                </Typography>
            </Box>
            <List>
                <ListItem>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.history.push("/");
                        }}
                        fullWidth
                    >
                        <i className="material-icons">home</i>
                        Home
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.history.push("/inspire_me");
                        }}
                        fullWidth
                    >
                        <i className="material-icons">explore</i>
                        Inspire Me
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.history.push("/food_mood");
                        }}
                        fullWidth
                    >
                        <i className="material-icons">cake</i>
                        Food Mood
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.history.push("/community_posts");
                        }}
                        fullWidth
                    >
                        <i className="material-icons">location_city</i>
                        Community Posts
                    </Button>
                </ListItem>
                <Divider />
                <ListItem>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.history.push("/my_subscriptions");
                        }}
                        fullWidth
                    >
                        <i className="material-icons">star</i>
                        My Subscriptions
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.history.push("/my_attending");
                        }}
                        fullWidth
                    >
                        <i className="material-icons">event</i>
                        Events I'm Attending
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.history.push("/myDeletedContent");
                        }}
                        fullWidth
                    >
                        <i className="material-icons">delete</i>
                        Recycle Bin
                    </Button>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className="header__content">
            <Button onClick={toggleDrawer("left", true)}>
                <i className="material-icons">menu</i>
            </Button>
            <Link to="/">
                <img className="header__logo" src={CDNLink + "/dist/images/logo.png"} />
            </Link>
            <Drawer classes={{ paper: classes.paper }} open={state.left} onClose={toggleDrawer("left", false)}>
                {sideList("left")}
            </Drawer>
        </div>
    );
}
