import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import DashboardPage from "../components/pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MyChannelsPage from "../components/pages/MyChannelsPage";
import SignUpPage from "../components/pages/SignUpPage";
import { connect } from "react-redux";
import { authCheckState } from "../actions/auth";
import LoginPage from "../components/pages/LoginPage";
import Header from "../components/Header";
import NotFoundPage from "../components/pages/NotFoundPage";
import SideBar from "../components/SideBar";
import InterestsPage from "../components/pages/InterestsPage";

export const history = createHistory();

class AppRouter extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <SideBar />
                    <Header />
                    <Switch>
                        <Route path="/" component={DashboardPage} exact={true} />
                        <PublicRoute path="/login" component={LoginPage} exact={true} />
                        <PublicRoute path="/signup" component={SignUpPage} exact={true} />
                        <PrivateRoute path="/myChannels" component={MyChannelsPage} exact={true} />
                        <PrivateRoute path="/interests" component={InterestsPage} exact={true} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRouter);
