import React from "react";
import API from "../utils/API";
import { getMyChannels } from "../selectors/myChannels";

class ChannelList extends React.Component {
    state = {
        channels: [],
        isLoaded: false,
        error: null
    };

    componentDidMount() {
        API.get("channels/").then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    channels: getMyChannels(result.data)
                });
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    render() {
        const { error, isLoaded, channels } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {channels.map((channel) => (
                        <div key={channel.channel_id}>
                            <h1>{channel.channel_name}</h1>
                            <span>{channel.creation_date}</span>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default ChannelList;
