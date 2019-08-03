import React from "react";
import { addIncentivePackage } from "../../actions/incentivePackage";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startSetEvent, clearEvents } from "../../actions/events";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class AddEventIncentivePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearEvents();
        const event_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startSetEvent(event_id)
                    .then((event_res) => {
                        if (res.data.username !== event_res.data.event_owner) {
                            this.props.history.push(`/myChannels`);
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

    onSubmit = (incentive) => {
        const post_id = this.props.event.post;
        this.props
            .addIncentivePackage(incentive)
            .then((res) => this.props.history.push(`/post-events/${post_id}`))
            .catch((err) => {
                console.log(err);
            });
    };

    goBack = () => {
        const event_id = this.props.match.params.id;
        const post_id = this.props.event.post;
        this.props.history.push(`/myPosts/${post_id}/events/${event_id}/edit`);
    };

    goToIncentive = () => {
        const event_id = this.props.match.params.id;
        this.props.history.push(`/myEvents/${event_id}/editIncentive`);
    };

    render() {
        const read_only = !!this.props.event && this.props.event.deleted_flag;
        const existing_incentive = !!this.props.event && !!this.props.event.event_incentive;

        return (
            !!this.props.event && (
                <div>
                    <Box bgcolor="secondary.main" py={3}>
                        <Container fixed>
                            <Typography gutterBottom variant="h2">
                                Add an Incentive Package to Event:{" "}
                                <Typography variant="inherit" display="inline" color="primary">
                                    {this.props.event && this.props.event.event_title}
                                </Typography>
                            </Typography>

                            {existing_incentive ? (
                                <Box paddingBottom={2}>
                                    <Typography variant="h2" color="error" gutterBottom>
                                        There is already an existing incentive tied to this event.
                                    </Typography>
                                    <Button variant="contained" color="primary" onClick={this.goToIncentive}>
                                        Go to Incentive
                                    </Button>
                                </Box>
                            ) : (
                                read_only && (
                                    <Typography variant="h2" color="error" gutterBottom>
                                        The event this incentive will be tied to is deleted. Restore it before adding an
                                        incentive.
                                    </Typography>
                                )
                            )}
                            <Box>
                                <Button variant="contained" color="primary" onClick={this.goBack}>
                                    Go to Event
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                    <Container fixed>
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            nextStep="Save"
                            event={this.props.event}
                            fromEvent={true}
                            read_only={read_only || existing_incentive}
                        />
                    </Container>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.events.events.length !== 0 ? state.events.events : null
});

const mapDispatchToProps = (dispatch) => ({
    clearEvents: () => dispatch(clearEvents()),
    addIncentivePackage: (incentive) => dispatch(addIncentivePackage(incentive)),
    startSetEvent: (id) => dispatch(startSetEvent(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEventIncentivePage);
