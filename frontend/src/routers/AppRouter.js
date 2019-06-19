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
import AddChannelPage from "../components/pages/AddChannelPage";
import InterestsPage from "../components/pages/InterestsPage";
import MyChannelDetail from "../components/pages/MyChannelDetail";
import EditChannelPage from "../components/pages/EditChannelPage";
import AddPostPage from "../components/pages/AddPostPage";
import EditPostPage from "../components/pages/EditPostPage";
import IncentiveForm from "../components/forms/IncentiveForm";
import { setAuthToken } from "../utils/API";

export const history = createHistory();

class AppRouter extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
        setAuthToken(localStorage.getItem("token"));
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <SideBar />
                    <Header history={history} />
                    <Switch>
                        <Route path="/" component={DashboardPage} exact={true} />
                        <PublicRoute path="/login" component={LoginPage} exact={true} />
                        <PublicRoute path="/signup" component={SignUpPage} exact={true} />
                        <PrivateRoute path="/myChannels" component={MyChannelsPage} exact={true} />
                        <PrivateRoute path="/myChannels/:id" component={MyChannelDetail} exact={true} />
                        <PrivateRoute path="/myChannels/:id/addPost" component={AddPostPage} exact={true} />
                        <PrivateRoute path="/myPosts/:id/edit" component={EditPostPage} exact={true} />
                        <PrivateRoute path="/myChannels/edit/:id" component={EditChannelPage} exact={true} />
                        <PrivateRoute path="/addChannel" component={AddChannelPage} exact={true} />
                        <PrivateRoute path="/interests" component={InterestsPage} exact={true} />
                        <Route path="/incentiveForm" component={IncentiveForm} exact={true} />
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
