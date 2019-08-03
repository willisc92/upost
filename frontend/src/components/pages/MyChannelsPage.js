import React from "react";
import { getVisibleChannels } from "../../selectors/myChannels";
import { connect } from "react-redux";
import { startSetChannels } from "../../actions/channels";
import MyChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";
import ChannelListItem from "../ChannelListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { HelpToolTip } from "../HelpTooltip";

export class MyChannelsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
    }

    componentDidMount() {
        this.props.startSetChannels();
    }

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    handleAddChannel = () => {
        this.props.history.push("/addChannel");
    };

    render() {
        const channels = !!this.props.channels && this.props.channels;

        return (
            channels && (
                <React.Fragment>
                    <Box bgcolor="secondary.main" py={3}>
                        <Container fixed>
                            <Typography variant="h1" color="primary" gutterBottom>
                                {localStorage.getItem("first_name")} -
                                <Typography variant="inherit" display="inline" color="textPrimary">
                                    {" "}
                                    Bulletin Boards
                                    <HelpToolTip
                                        html={
                                            <React.Fragment>
                                                <Typography variant="caption">
                                                    Bulletin Boards are a place where you can store related posts.
                                                    <br />
                                                    <br />
                                                    For example, you could make a bulletin board for related posts for
                                                    your club that you run at your University and another bulletin board
                                                    for an unrelated club!
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </Typography>
                            </Typography>

                            <Box marginTop={2}>
                                <MyChannelFilterSelector />
                                <Button
                                    color="primary"
                                    size="large"
                                    variant="contained"
                                    onClick={this.handleAddChannel}
                                >
                                    Create a Bulletin Board
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                    <Box paddingTop={2}>
                        <Container fixed>
                            <Box display="flex" flexWrap="wrap">
                                {channels.length > 0 ? (
                                    channels.map((channel) => {
                                        return (
                                            <ChannelListItem
                                                channel={channel}
                                                key={channel.channel_id}
                                                pathName={`/channels/${channel.channel_id}`}
                                                inHorizontalMenu={false}
                                            />
                                        );
                                    })
                                ) : (
                                    <Typography color="error" variant="h4">
                                        No Bulletin Boards
                                    </Typography>
                                )}
                            </Box>
                        </Container>
                    </Box>
                </React.Fragment>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channels: getVisibleChannels(state.channels.channels, state.channelFilters, false),
        loading: state.channels.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelsPage);
