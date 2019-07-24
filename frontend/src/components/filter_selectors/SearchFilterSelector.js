import React from "react";
import ChannelFilterSelector from "./ChannelFilterSelector";
import EventFilterSelector from "./EventFilterSelector";
import PostFilterSelector from "./PostFilterSelector";

export class SearchFilterSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: "all"
        };
    }

    render() {
        <React.Fragment>
            <div className="input-group">
                <div className="input-group__column">
                    Show:
                    <div className="input-group__item">
                        <select className="select" defaultValue={this.state.show} onChange={this.onShowChange}>
                            <option value="all">Show All</option>
                            <option value="channels">Channels</option>
                            <option value="posts">Posts</option>
                            <option value="events">Events</option>
                        </select>
                    </div>
                </div>
            </div>
            {this.state.show === "all" || (this.state.show === "channels" && <ChannelFilterSelector />)}
            {this.state.show === "all" || (this.state.show === "posts" && <PostFilterSelector />)}
            {this.state.show === "all" || (this.state.show === "events" && <EventsFilterSelector />)}
        </React.Fragment>;
    }
}
