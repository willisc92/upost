import React from "react";
import { connect } from "react-redux";

class DashboardPage extends React.Component {
    render() {
        if (!this.props.isAuthenticated) {
            return (
                <div>
                    <h1>You must login.</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Welcome, ${localStorage.getItem("first_name")}!</h1>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    };
};

export default connect(mapStateToProps)(DashboardPage);
