import React from "react";
import { getVisibleChannels } from "../../selectors/myChannels";
import { connect } from "react-redux";
import { startSetChannels } from "../../actions/channels";
import MyChannelFilterSelector from "../filter_selectors/ChannelFilterSelector";
import ChannelSummary from "../ChannelListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { HelpToolTip } from "../HelpTooltip";
import CustomStepper from "../CustomStepper";
import { BulletinBoardDescription } from "../tooltip_descriptions/Descriptions";
import Loading from "./LoadingPage";
import { resetChannelFilters } from "../../actions/channel_filters";

export class MyChannelsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            steps: [{ label: "Bulletin Boards", onClick: null }, { label: null, onClick: null }],
            activeStep: 0
        };
    }

    componentDidMount() {
        this.props.resetChannelFilters();
        this.props.startSetChannels();
    }

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    handleAddChannel = () => {
        this.props.history.push("/addChannel");
    };

    render() {
        const channels = !!this.props.channels && getVisibleChannels(this.props.channels, this.props.filters, false);

        return (
            <React.Fragment>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" color="primary" gutterBottom>
                            {localStorage.getItem("first_name")} -
                            <Typography variant="inherit" display="inline" color="textPrimary">
                                {" "}
                                Bulletin Boards
                                <HelpToolTip
                                    jsx={
                                        <React.Fragment>
                                            <Typography variant="caption">
                                                {BulletinBoardDescription}
                                                <br />
                                                <br />
                                                From here you can:
                                                <ul>
                                                    <li>Click on a bulletin board to see its posts and details</li>
                                                    <li>Create a new bulletin board</li>
                                                </ul>
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </Typography>
                        </Typography>
                        <CustomStepper steps={this.state.steps} activestep={this.state.activestep} />
                        <Box marginTop={2}>
                            <MyChannelFilterSelector />
                            <Button color="primary" size="large" variant="contained" onClick={this.handleAddChannel}>
                                Create a Bulletin Board
                            </Button>
                        </Box>
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    <Box py={2}>
                        {channels ? (
                            channels.length > 0 ? (
                                <Box display="flex" flexWrap="wrap">
                                    {channels.map((channel) => {
                                        return (
                                            <ChannelSummary
                                                key={channel.channel_id}
                                                channel={channel}
                                                pathName={`/channel/${channel.channel_id}`}
                                                inHorizontalMenu={false}
                                            />
                                        );
                                    })}
                                </Box>
                            ) : this.props.channels.length === 0 ? (
                                <Typography variant="h2">You have no Bulletin Boards.</Typography>
                            ) : (
                                <Typography variant="h2">No Matching Bulletin Boards</Typography>
                            )
                        ) : (
                            <Box py={2}>
                                <Loading />
                            </Box>
                        )}
                    </Box>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channels: state.channels.channels,
        filters: state.channelFilters
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels()),
    resetChannelFilters: () => dispatch(resetChannelFilters())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyChannelsPage);
