import React from "react";
import { addEvent } from "../../actions/events";
import { getCurrentUser } from "../../actions/auth";
import EventForm from "../forms/EventForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";

// TODO:  Refactor this to be an add Event+Incentive Page, with the option for recurring submit from AddPostPage.
class AddEventPage extends React.Component {
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

    onSubmit = (event) => {
        const post_id = this.props.match.params.id;

        this.props
            .addEvent(event)
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
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Add an Event to Post: <span>{this.props.post && this.props.post.post_title}</span>
                        </h1>
                    </div>
                </div>
                <div className="content-container">
                    <EventForm
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
    addEvent: (event) => dispatch(addEvent(event)),
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToprops,
    mapDispatchToProps
)(AddEventPage);
