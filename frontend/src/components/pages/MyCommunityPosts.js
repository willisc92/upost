import React from "react";
import { connect } from "react-redux";
import { getCommunityPosts } from "../../actions/posts";
import MyPostSummary from "../MyPostSummary";
import { Link } from "react-router-dom";
import PostFilterSelector from "../filter_selectors/PostFilterSelector";
import { getVisiblePosts } from "../../selectors/myPosts";

import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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
                    <Box bgcolor="secondary.main" py={3}>
                        <Container fixed>
                            <Typography variant="h1" gutterBottom>
                                Posts from your Communities
                            </Typography>
                            <PostFilterSelector />
                        </Container>
                    </Box>
                    <Container fixed>
                        <Box display="flex" flexWrap="wrap" py={2}>
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
                                <Typography variant="h2">
                                    There are no posts in your selected communities. Please check again later or{" "}
                                    <Typography variant="inherit" color="primary" display="inline">
                                        <ButtonBase
                                            onClick={() => {
                                                this.props.history.push("/communities");
                                            }}
                                        >
                                            click here to edit your communities.
                                        </ButtonBase>
                                    </Typography>
                                </Typography>
                            )}
                        </Box>
                    </Container>
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
