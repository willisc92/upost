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
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const drawerWidth = 240;
const appBarHeight = 64;
const footerHeight = 125;
const footerMargin = 30;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        height: appBarHeight
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    footer: {
        marginTop: footerMargin,
        bottom: 0,
        height: footerHeight,
        display: "flex",
        flexDirection: "column"
    },
    menuButton: {
        marginRight: 15
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
        padding: 0,
        margin: 0,
        minWidth: 150,
        backgroundColor: "white"
    },
    main: {
        minHeight: `calc(100vh - ${appBarHeight + footerHeight + footerMargin}px)`, //idk why scrolling still happens
        margin: 0,
        padding: 0,
        marginTop: appBarHeight,
        backgroundColor: "white"
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
                <Box alignItems="center" display="flex" justifyContent="space-between" paddingRight={0.5}>
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
                </Box>
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
                            handleDrawerClose();
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
                            handleDrawerClose();
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
                            handleDrawerClose();
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
                            handleDrawerClose();
                        }}
                    >
                        <ListItemIcon>
                            <Icon>location_city</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"MY COMMUNITIES"} />
                    </ListItem>

                    <Divider />
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/my_subscriptions");
                            handleDrawerClose();
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
                            handleDrawerClose();
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
                            handleDrawerClose();
                        }}
                    >
                        <ListItemIcon>
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"RECYCLE BIN"} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            props.history.push("/contact-us");
                            handleDrawerClose();
                        }}
                    >
                        <ListItemIcon>
                            <Icon>feedback</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"CONTACT US"} />
                    </ListItem>
                </List>
            </Drawer>
            <Box className={classes.content}>
                <main className={classes.main}>{props.children}</main>
                <Footer className={classes.footer} history={props.history} />
            </Box>
        </div>
    );
};
