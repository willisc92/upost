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
                <RadiumLink id="around_me" className="menu-item" to="/around_me" onClick={() => this.closeMenu()}>
                    Around Me
                </RadiumLink>
                <RadiumLink id="my_list" className="menu-item" to="/my_list" onClick={() => this.closeMenu()}>
                    My List
                </RadiumLink>
                <RadiumLink id="my_list" className="menu-item" to="/myDeletedContent" onClick={() => this.closeMenu()}>
                    Recycle Bin
                </RadiumLink>
            </Menu>
        );
    }
}

export default SideBar;
