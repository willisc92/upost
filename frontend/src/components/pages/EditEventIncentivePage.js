import React from "react";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startSetEvent, clearEvents } from "../../actions/events";
import {
    startGetIncentivePackage,
    clearIncentivePackage,
    editIncentivePackage,
    deleteIncentivePackage,
    restoreIncentivePackage
} from "../../actions/incentivePackage";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class EditEventIncentivePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.clearEvents();
        this.props.clearIncentivePackage();

        const event_id = this.props.match.params.id;
        getCurrentUser().then((res) => {
            this.props
                .startSetEvent(event_id)
                .then((event_res) => {
                    if (res.data.username !== event_res.data.event_owner) {
                        this.props.history.push(`/myChannels`);
                    } else {
                        this.props
                            .startGetIncentivePackage(event_res.data.event_incentive.incentive_package_id)
                            .then(() => {})
                            .catch((err) => console.log(JSON.stringify(err, null, 2)));
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err, null, 2));
                });
        });
    }

    onSubmit = (incentive) => {
        const incentive_id = this.props.incentive.incentive_package_id;
        const post_id = this.props.event.post;
        this.props
            .editIncentivePackage(incentive_id, incentive)
            .then((res) => this.props.history.push(`/myPosts/${post_id}/events/`))
            .catch((err) => {
                console.log(err);
            });
    };

    goBack = () => {
        const event_id = this.props.match.params.id;
        const post_id = this.props.event.post;
        this.props.history.push(`/myPosts/${post_id}/events/${event_id}/edit`);
    };

    deleteIncentive = () => {
        const incentive_id = this.props.incentive.incentive_package_id;
        this.props.deleteIncentivePackage(incentive_id).then(() => {
            this.props
                .startGetIncentivePackage(incentive_id)
                .then(() => {})
                .catch((err) => {
                    console.log(JSON.stringify(err, null, 2));
                });
        });
    };

    restoreIncentive = () => {
        const incentive_id = this.props.incentive.incentive_package_id;
        this.props.restoreIncentivePackage(incentive_id).then(() => {
            this.props
                .startGetIncentivePackage(incentive_id)
                .then(() => {})
                .catch((err) => {
                    console.log(JSON.stringify(err, null, 2));
                });
        });
    };

    render() {
        const incentive = this.props.incentive;
        const event = this.props.event;
        const read_only_event = !!event && event.deleted_flag;
        const read_only_incentive = !!incentive && incentive.deleted_flag;
        const read_only_incentive_end = !!incentive
            ? new Date(incentive.planned_end_date) < new Date()
                ? true
                : false
            : true;
        const read_only = read_only_event || read_only_incentive || read_only_incentive_end;

        return (
            !!event &&
            !!incentive && (
                <div>
                    <Box bgcolor="secondary.main" py={3}>
                        <Container fixed>
                            <Typography variant="h1" gutterBottom>
                                Edit the Incentive Package to Event:{" "}
                                <Typography variant="h1" display="inline" color="primary">
                                    {this.props.event && this.props.event.event_title}
                                </Typography>
                            </Typography>
                            <Box paddingBottom={2}>
                                {read_only_event ? (
                                    <Typography variant="h2" color="error" gutterBottom>
                                        The event this incentive is tied to is deleted. Restore it to edit.
                                    </Typography>
                                ) : read_only_incentive ? (
                                    <React.Fragment>
                                        <Typography variant="h2" color="error" gutterBottom>
                                            This incentive is deleted. Restore it to edit.
                                        </Typography>
                                        <Button variant="contained" color="primary" onClick={this.restoreIncentive}>
                                            Restore Incentive
                                        </Button>
                                    </React.Fragment>
                                ) : read_only_incentive_end ? (
                                    <Typography variant="h2" color="error" gutterBottom>
                                        Cannot edit a past incentive.
                                    </Typography>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={this.deleteIncentive}>
                                        Delete Incentive
                                    </Button>
                                )}
                            </Box>
                            <Button variant="contained" color="primary" onClick={this.goBack}>
                                Go To Event
                            </Button>
                        </Container>
                    </Box>
                    <Container fixed>
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            nextStep="Save"
                            incentivePackage={this.props.incentive}
                            fromEvent={true}
                            read_only={read_only}
                        />
                    </Container>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.events.events.length !== 0 ? state.events.events : null,
    incentive: state.incentivePackage.incentivePackage.length !== 0 ? state.incentivePackage.incentivePackage : null
});

const mapDispatchToProps = (dispatch) => ({
    clearEvents: () => dispatch(clearEvents()),
    clearIncentivePackage: () => dispatch(clearIncentivePackage()),
    editIncentivePackage: (id, incentive) => dispatch(editIncentivePackage(id, incentive)),
    startSetEvent: (id) => dispatch(startSetEvent(id)),
    startGetIncentivePackage: (id) => dispatch(startGetIncentivePackage(id)),
    restoreIncentivePackage: (id) => dispatch(restoreIncentivePackage(id)),
    deleteIncentivePackage: (id) => dispatch(deleteIncentivePackage(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEventIncentivePage);
