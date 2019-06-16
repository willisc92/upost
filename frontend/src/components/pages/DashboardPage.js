import React from "react";
import { connect } from "react-redux";
import { getAllInterests } from "../../actions/interests";

export class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.getAllInterests().then(() => {
            console.log(this.props.interests);
        });
    }

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {!this.props.isAuthenticated ? (
                        <h1 className="page-header__title">You must login.</h1>
                    ) : (
                        <h1 className="page-header__title">{`Welcome, ${localStorage.getItem("first_name")}!`}</h1>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token,
        interests: state.userInterests
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterests: () => dispatch(getAllInterests())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);
