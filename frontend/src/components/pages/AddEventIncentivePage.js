import React from "react";
import { addIncentivePackage } from "../../actions/incentivePackage";
import { getCurrentUser } from "../../actions/auth";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { startSetEvent, clearEvents } from "../../actions/events";

class AddEventIncentivePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearPosts();
        this.props.clearEvents();
        const event_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startSetEvent(event_id)
                    .then((event_res) => {
                        this.props
                            .startGetPost(event_res.data.post)
                            .then((post_res) => {
                                if (res.data.username !== post_res.data[0].user) {
                                    this.props.history.push(`/myChannels`);
                                }
                            })
                            .catch((err) => {
                                console.log(JSOn.stringify(err, null, 2));
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
        const post_id = this.props.event.post;
        this.props
            .addIncentivePackage(incentive)
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
        return (
            !!this.props.event && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">
                                Add an Incentive Package to Event:{" "}
                                <span>{this.props.event && this.props.event.event_title}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="content-container">
                        <IncentiveForm
                            onSubmit={this.onSubmit}
                            nextStep="Save"
                            event={this.props.event}
                            fromEvent={true}
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
    event: state.events.events.length !== 0 ? state.events.events : null
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    clearEvents: () => dispatch(clearEvents()),
    addIncentivePackage: (incentive) => dispatch(addIncentivePackage(incentive)),
    startGetPost: (id) => dispatch(startGetPost(id)),
    startSetEvent: (id) => dispatch(startSetEvent(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEventIncentivePage);
