import React from 'react';

class ChannelList extends React.Component {
    state = {
        channels: []
    };

    async componentDidMount() {
        try {
          const res = await fetch('http://127.0.0.1:8000/api/channels/');
          const channels = await res.json();
          this.setState({
            channels
          });
        } catch (e) {
          console.log(e);
        }
    }
    
    render() {
      return (
        <div>
          {this.state.channels.map((channel) => (
            <div key={channel.channel_id}>
              <h1>{channel.channel_name}</h1>
              <span>{channel.creation_date}</span>
            </div>
          ))}
        </div>
      );
    }
}

export default ChannelList; 

    