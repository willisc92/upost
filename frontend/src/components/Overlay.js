import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Header from "./Header";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: 0
    }
}));

export default (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <div className="header__content">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/">
                            <img className="header__logo" src={CDNLink + "/dist/images/logo.png"} />
                        </Link>
                    </Toolbar>
                    <Header history={props.history} />
                </div>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/");
                        }}
                    >
                        <ListItemIcon>
                            <Icon>home</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"HOME"} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/inspire_me");
                        }}
                    >
                        <ListItemIcon>
                            <Icon>explore</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"INSPIRE ME"} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/food_mood");
                        }}
                    >
                        <ListItemIcon>
                            <Icon>cake</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"FOOD MOOD"} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/community_posts");
                        }}
                    >
                        <ListItemIcon>
                            <Icon>location_city</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"COMMUNITY POSTS"} />
                    </ListItem>

                    <Divider />
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/community_my_subscriptions");
                        }}
                    >
                        <ListItemIcon>
                            <Icon>star</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"MY SUBSCRIPTIONS"} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/my_attending");
                        }}
                    >
                        <ListItemIcon>
                            <Icon>event</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"EVENTS IM ATTENDING"} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/myDeletedContent");
                        }}
                    >
                        <ListItemIcon>
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"RECYCLE BIN"} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>{props.children}</main>
        </div>
    );
};