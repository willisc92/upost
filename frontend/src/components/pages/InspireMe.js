import React from "react";
import { connect } from "react-redux";
import { getRandomNonInterestPost } from "../../actions/posts";

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
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Getting a Post for you...</h1>
                </div>
            </div>
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
