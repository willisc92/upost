import React from "react";
import { connect } from "react-redux";
import { getCommunityPosts } from "../../actions/posts";
import MyPostSummary from "../MyPostSummary";
import PostFilterSelector from "../filter_selectors/PostFilterSelector";
import { getVisiblePosts } from "../../selectors/myPosts";
import { HelpToolTip } from "../HelpTooltip";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Loading from "./LoadingPage";
import { resetPostFilters } from "../../actions/post_filters";

export class MyCommunityPosts extends React.Component {
    componentDidMount() {
        this.props.resetPostFilters();
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
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" gutterBottom>
                            My Communities
                            <HelpToolTip
                                jsx={
                                    <React.Fragment>
                                        <Typography variant="caption">
                                            Here you can see all posts that are linked to communities that you have
                                            selected!
                                            <br />
                                            <br />
                                            All posts that appear here may or may not be relevant to your interests!
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </Typography>
                        <PostFilterSelector />
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    <Box py={2}>
                        {posts ? (
                            posts.length > 0 ? (
                                <Box display="flex" flexWrap="wrap">
                                    {posts.map((post) => {
                                        return (
                                            <MyPostSummary
                                                key={post.post_id}
                                                post={post}
                                                pathName={`/post/${post.post_id}`}
                                                inHorizontalMenu={false}
                                            />
                                        );
                                    })}
                                </Box>
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
                            )
                        ) : (
                            <Box py={2}>
                                <Loading />
                            </Box>
                        )}
                    </Box>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    filters: state.postFilters
});

const mapDispatchToProps = (dispatch) => ({
    getCommunityPosts: () => dispatch(getCommunityPosts()),
    resetPostFilters: () => dispatch(resetPostFilters())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCommunityPosts);
