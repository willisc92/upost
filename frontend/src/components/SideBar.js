import React from "react";
import { slide as Menu } from "react-burger-menu";

export class SideBar extends React.Component {
    render() {
        return (
            <Menu>
                <a id="home" className="menu-item" href="/">
                    Home
                </a>
                <a id="inspire_me" className="menu-item" href="/inspire_me">
                    Inspire Me
                </a>
                <a id="food_mood" className="menu-item" href="/food_mood">
                    Food Mood
                </a>
                <a id="around_me" className="menu-item" href="/around_me">
                    Around Me
                </a>
                <a id="my_list" className="menu-item" href="/my_list">
                    My List
                </a>
                <a id="my_list" className="menu-item" href="/myDeletedContent">
                    Recycle Bin
                </a>
            </Menu>
        );
    }
}

export default SideBar;
