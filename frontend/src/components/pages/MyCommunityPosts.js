import React from "react";
import { connect } from "react-redux";
import { getCommunityPosts } from "../../actions/posts";
import MyPostSummary from "../MyPostSummary";
import { Link } from "react-router-dom";
import PostFilterSelector from "../filter_selectors/PostFilterSelector";
import { getVisiblePosts } from "../../selectors/myPosts";

export class MyCommunityPosts extends React.Component {
    componentDidMount() {
        this.props
            .getCommunityPosts()
            .then(() => {})
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

    render() {
        const posts = !!this.props.posts && getVisiblePosts(this.props.posts, this.props.filters, false);

        return (
            posts && (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Posts from your Communities</h1>
                            <div className="page-header__actions">
                                <PostFilterSelector />
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="polaroid__container">
                            {posts.length > 0 ? (
                                posts.map((post) => {
                                    return (
                                        <MyPostSummary
                                            key={post.post_id}
                                            post={post}
                                            pathName={`/post/${post.post_id}`}
                                            inHorizontalMenu={false}
                                        />
                                    );
                                })
                            ) : (
                                <h1>
                                    There are no posts in your selected communities. Please check again later or{" "}
                                    <span>
                                        <Link className="link__inline" to="/communities">
                                            click here to edit your communities.
                                        </Link>
                                    </span>
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    filters: state.postFilters
});

const mapDispatchToProps = (dispatch) => ({
    getCommunityPosts: () => dispatch(getCommunityPosts())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCommunityPosts);
