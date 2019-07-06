import React from "react";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startSetEvent, clearEvents } from "../../actions/events";
import { startGetIncentivePackage, clearIncentivePackage, editIncentivePackage } from "../../actions/incentivePackage";

class EditEventIncentivePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.clearPosts();
        this.props.clearEvents();
        this.props.clearIncentivePackage();

        const event_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startSetEvent(event_id)
                    .then((event_res) => {
                        this.props
                            .startGetPost(event_res.data.post)
                            .then((post_res) => {
                                if (res.data.username !== post_res.data[0].user || !event_res.data.event_incentive) {
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
        const incentive_id = this.props.incentive.incentive_package_id;
        const post_id = this.props.event.post;
        this.props
            .editIncentivePackage(incentive_id, incentive)
            .then((res) => this.props.history.push(`/myPosts/${post_id}/events/`))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    goBack = () => {
        const event_id = this.props.match.params.id;
        const post_id = this.props.event.post;
        this.props.history.push(`/myPosts/${post_id}/events/${event_id}/edit`);
    };

    render() {
        const incentive = this.props.incentive;
        const read_only = !!this.props.incentive
            ? new Date(incentive.planned_start_date) < new Date()
                ? true
                : false
            : true;

        return (
            !!this.props.event &&
            !!this.props.incentive && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Edit the Incentive Package to Event:{" "}
                                <span>{this.props.event && this.props.event.event_title}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="content-container">
                        {read_only && <p className="form__error">Cannot Edit a Past/Ongoing Incentive</p>}
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            nextStep="Save"
                            incentivePackage={this.props.incentive}
                            fromEvent={true}
                            read_only={read_only}
                        />
                        <button className="button" onClick={this.goBack}>
                            {" "}
                            Go Back{" "}
                        </button>
                    </div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts[0],
    event: state.events.events.length !== 0 ? state.events.events : null,
    incentive: state.incentivePackage.incentivePackage.length !== 0 ? state.incentivePackage.incentivePackage : null
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    clearEvents: () => dispatch(clearEvents()),
    clearIncentivePackage: () => dispatch(clearIncentivePackage()),
    editIncentivePackage: (id, incentive) => dispatch(editIncentivePackage(id, incentive)),
    startGetPost: (id) => dispatch(startGetPost(id)),
    startSetEvent: (id) => dispatch(startSetEvent(id)),
    startGetIncentivePackage: (id) => dispatch(startGetIncentivePackage(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEventIncentivePage);
