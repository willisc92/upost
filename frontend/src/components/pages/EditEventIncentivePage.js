import React from "react";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startSetEvent, clearEvents } from "../../actions/events";
import {
    startGetIncentivePackage,
    clearIncentivePackage,
    editIncentivePackage,
    deleteIncentivePackage,
    restoreIncentivePackage
} from "../../actions/incentivePackage";

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
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Edit the Incentive Package to Event:{" "}
                                <span>{this.props.event && this.props.event.event_title}</span>
                            </h1>
                            <div className="page-header__actions">
                                {read_only_event ? (
                                    <div>
                                        <h2 className="page-header__subtitle__red">
                                            The event this incentive is tied to is deleted. Restore it to edit.
                                        </h2>
                                        <button className="button" onClick={this.goBack}>
                                            Go To Event
                                        </button>
                                    </div>
                                ) : read_only_incentive ? (
                                    <div>
                                        <h2 className="page-header__subtitle__red">
                                            This incentive is deleted. Restore it to edit.
                                        </h2>
                                        <button className="button" onClick={this.restoreIncentive}>
                                            Restore Incentive
                                        </button>{" "}
                                        <button className="button" onClick={this.goBack}>
                                            Go To Event
                                        </button>
                                    </div>
                                ) : read_only_incentive_end ? (
                                    <h2 className="page-header__subtitle__red">Cannot edit a past incentive.</h2>
                                ) : (
                                    <div>
                                        <button className="button" onClick={this.deleteIncentive}>
                                            Delete Incentive
                                        </button>{" "}
                                        <button className="button" onClick={this.goBack}>
                                            Go To Event
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            nextStep="Save"
                            incentivePackage={this.props.incentive}
                            fromEvent={true}
                            read_only={read_only}
                        />
                    </div>
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
