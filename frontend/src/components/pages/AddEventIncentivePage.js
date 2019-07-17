import React from "react";
import { addIncentivePackage } from "../../actions/incentivePackage";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startSetEvent, clearEvents } from "../../actions/events";

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
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Add an Incentive Package to Event:{" "}
                                <span>{this.props.event && this.props.event.event_title}</span>
                            </h1>
                            {existing_incentive ? (
                                <div>
                                    <h2 className="page-header__subtitle__red">
                                        There is already an existing incentive tied to this event.
                                    </h2>
                                    <button className="button" onClick={this.goToIncentive}>
                                        Go to Incentive
                                    </button>
                                </div>
                            ) : (
                                read_only && (
                                    <div>
                                        <h2 className="page-header__subtitle__red">
                                            The event this incentive will be tied to is deleted. Restore it before
                                            adding an incentive.
                                        </h2>
                                    </div>
                                )
                            )}
                            <div className="page-header__actions">
                                <button className="button" onClick={this.goBack}>
                                    Go to Event
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            nextStep="Save"
                            event={this.props.event}
                            fromEvent={true}
                            read_only={read_only || existing_incentive}
                        />
                    </div>
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
