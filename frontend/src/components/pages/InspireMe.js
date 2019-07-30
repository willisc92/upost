import React from "react";
import { connect } from "react-redux";
import { getRandomNonInterestPost } from "../../actions/posts";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export class InspireMe extends React.Component {
    componentDidMount() {
        this.props
            .getRandomNonInterestPost()
            .then((res) => {
                const post_id = res.data[0].post_id;
                this.props.history.push(`/post/${post_id}`);
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
                this.props.history.push("/");
            });
    }

    render() {
        return (
            <Box bgcolor="secondary.main" py={3}>
                <Container fixed>
                    <Typography variant="h1">Getting a Post for you...</Typography>
                </Container>
            </Box>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRandomNonInterestPost: () => dispatch(getRandomNonInterestPost())
});

export default connect(
    null,
    mapDispatchToProps
)(InspireMe);
