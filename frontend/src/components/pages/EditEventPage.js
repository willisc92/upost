import React from "react";
import { editEvent } from "../../actions/events";
import { getCurrentUser } from "../../actions/auth";
import EventForm from "../forms/EventForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";

class EditEventPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetPost(post_id)
                    .then((post_res) => {
                        if (res.data.username !== post_res.data[0].user) {
                            this.props.history.push(`/myPosts/${post_id}/events`);
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

    onSubmit = (updates) => {
        const { event } = this.props.location.state;
        const post_id = this.props.match.params.id;

        this.props
            .editEvent(event.event_id, updates)
            .then((res) => this.props.history.push(`/myPosts/${post_id}/events`))
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    goBack = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/events`);
    };

    render() {
        const { event } = this.props.location.state;
        const read_only = new Date(event.planned_start_date) < new Date() ? true : false;

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Edit Event: <span>{event && event.event_title}</span>
                        </h1>
                    </div>
                </div>
                <div className="content-container">
                    {read_only && <p className="form__error">Cannot Edit a Past/Ongoing Event</p>}
                    <EventForm
                        read_only={read_only}
                        event={event}
                        onSubmit={this.onSubmit}
                        nextStep={"Save and Return"}
                        post={this.props.match.params.id}
                    />
                    <button className="button" onClick={this.goBack}>
                        {" "}
                        Go Back{" "}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToprops = (state) => ({
    post: state.posts.posts[0]
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    editEvent: (id, updates) => dispatch(editEvent(id, updates)),
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToprops,
    mapDispatchToProps
)(EditEventPage);
