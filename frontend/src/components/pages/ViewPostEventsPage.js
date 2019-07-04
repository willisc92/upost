import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import EventFilterSelector from "../filter_selectors/EventFilterSelector";
import { getVisibleEvents } from "../../selectors/myEvents";
import EventSummary from "../MyEventSummary";

class ViewPostEventsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    componentDidMount() {
        const post_id = parseInt(this.props.match.params.id);

        // check to see if current post in store matches given id
        if (!!this.props.post && this.props.post.post_id === post_id) {
            // pass
        } else {
            // load post from API
            this.props.clearPosts();
            this.props.startGetPost(post_id).catch((err) => {
                console.log("error in getting post information", JSON.stringify(err, null, 2));
            });
        }
    }

    render() {
        const events = this.props.post && getVisibleEvents(this.props.post, this.props.filters);
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        {!!this.props.post && (
                            <h1 className="page-header__title">
                                Events for <span>{this.props.post.post_title}</span>
                            </h1>
                        )}
                        <div className="page-header__actions">
                            <EventFilterSelector />
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    {!!events &&
                        events.map((event) => {
                            return (
                                <EventSummary
                                    key={event.event_id}
                                    event={event}
                                    pathName={`/event/${event.event_id}`}
                                />
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts[0],
    filters: state.eventFilters
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewPostEventsPage);
