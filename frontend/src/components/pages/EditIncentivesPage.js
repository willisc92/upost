import React from "react";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { getCurrentUser } from "../../actions/auth";
import { MyIncentiveMenu } from "../MyIncentiveSummary";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { ArrowRight, ArrowLeft } from "../menus/Arrow";
import IncentiveFilterSelector from "../filter_selectors/IncentiveFilterSelector";
import { getVisibleIncentives } from "../../selectors/myIncentives";
import { deleteIncentivePackage } from "../../actions/incentivePackage";

class EditIncentivesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
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
                            this.props.history.push("/myChannels");
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

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    clearAllIncentives = () => {
        const promises = [];
        const incentives = this.props.post.post_incentives;

        incentives.forEach((incentive) => {
            if (new Date(incentive.planned_start_date) > new Date()) {
                promises.push(this.props.deleteIncentivePackage(incentive.incentive_package_id));
            }
        });

        Promise.all(promises)
            .then(() => {
                this.props.startGetPost(this.props.match.params.id);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    returnEditPosts = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/edit`);
    };

    addEditEvents = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/events`);
    };

    addNewIncentive = () => {
        this.props.history.push(`/myPosts/${this.props.match.params.id}/addIncentive`);
    };

    render() {
        const menu =
            this.props.post &&
            MyIncentiveMenu(getVisibleIncentives(this.props.post, this.props.filters), this.state.selected);

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Add/Edit Incentives for <span>{this.props.post && this.props.post.post_title}</span>
                        </h1>
                        <div className="page-header__actions">
                            <IncentiveFilterSelector />
                        </div>
                        {!!menu && menu.length > 0 && (
                            <span>
                                <button className="button" onClick={this.clearAllIncentives}>
                                    Clear all future incentives
                                </button>{" "}
                            </span>
                        )}
                        <button className="button" onClick={this.addNewIncentive}>
                            Add a new incentive
                        </button>{" "}
                        <button className="button" onClick={this.addEditEvents}>
                            Add/Edit Events
                        </button>{" "}
                        <button className="button" onClick={this.returnEditPosts}>
                            Return to Edit Post
                        </button>
                    </div>
                </div>
                <div className="content-container">
                    {!!menu && menu.length > 0 ? (
                        <ScrollMenu
                            data={menu}
                            arrowLeft={ArrowLeft}
                            arrowRight={ArrowRight}
                            selected={this.state.selected}
                            onSelect={this.onSelect}
                        />
                    ) : (
                        <p>No Incentives to Show</p>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.incentiveFilters,
    loading: state.posts.loading,
    post: state.posts.posts[0]
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    startGetPost: (id) => dispatch(startGetPost(id)),
    deleteIncentivePackage: (id) => dispatch(deleteIncentivePackage(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditIncentivesPage);
