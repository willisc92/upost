import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import Radium from "radium";

let RadiumLink = Radium(Link);

export class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen });
    }

    closeMenu() {
        this.setState({ menuOpen: false });
    }

    render() {
        return (
            <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                <RadiumLink id="home" className="menu-item" to="/" onClick={() => this.closeMenu()}>
                    Home
                </RadiumLink>
                <RadiumLink id="inspire_me" className="menu-item" to="/inspire_me" onClick={() => this.closeMenu()}>
                    Inspire Me
                </RadiumLink>
                <RadiumLink id="food_mood" className="menu-item" to="/food_mood" onClick={() => this.closeMenu()}>
                    Food Mood
                </RadiumLink>
                <RadiumLink
                    id="community_posts"
                    className="menu-item"
                    to="/community_posts"
                    onClick={() => this.closeMenu()}
                >
                    My Communities
                </RadiumLink>
                <RadiumLink
                    id="my_subscriptions"
                    className="menu-item"
                    to="/my_subscriptions"
                    onClick={() => this.closeMenu()}
                >
                    My Subscriptions
                </RadiumLink>
                <RadiumLink id="my_attending" className="menu-item" to="/my_attending" onClick={() => this.closeMenu()}>
                    Events I'm Attending
                </RadiumLink>
                <RadiumLink id="my_list" className="menu-item" to="/myDeletedContent" onClick={() => this.closeMenu()}>
                    Recycle Bin
                </RadiumLink>
            </Menu>
        );
    }
}

export default SideBar;
