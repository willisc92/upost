import React from "react";
import { connect } from "react-redux";

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {!this.props.isAuthenticated ? (
                        <h1 className="page-header__title">You must login.</h1>
                    ) : (
                        <h1 className="page-header__title">Welcome, ${localStorage.getItem("first_name")}!</h1>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    };
};

export default connect(mapStateToProps)(DashboardPage);
