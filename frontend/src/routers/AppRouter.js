import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import DashboardPage from "../components/pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MyChannelsPage from "../components/pages/MyChannelsPage";
import { connect } from "react-redux";
import { authCheckState } from "../actions/auth";
import NotFoundPage from "../components/pages/NotFoundPage";
import AddChannelPage from "../components/pages/AddChannelPage";
import InterestsPage from "../components/pages/InterestsPage";
import CommunitiesPage from "../components/pages/CommunitiesPage";
import ViewChannelPage from "../components/pages/ViewChannelPage";
import EditChannelPage from "../components/pages/EditChannelPage";
import AddPostPage from "../components/pages/AddPostPage";
import EditPostPage from "../components/pages/EditPostPage";
import ViewPostPage from "../components/pages/ViewPostPage";
import ViewPostEventsPage from "../components/pages/ViewPostEventsPage";
import ViewEventPage from "../components/pages/ViewEventPage";
import AddEventPage from "../components/pages/AddEventPage";
import EditEventPage from "../components/pages/EditEventPage";
import AddEventIncentivePage from "../components/pages/AddEventIncentivePage";
import EditEventIncentivePage from "../components/pages/EditEventIncentivePage";
import AddIncentivePage from "../components/pages/AddIncentivePage";
import EditIncentivePage from "../components/pages/EditIncentivePage";
import SearchResultsPage from "../components/pages/SearchResultsPage";
import DeletedContentPage from "../components/pages/DeletedContentPage";
import FreeFoodPage from "../components/pages/FreeFoodPage";
import InspireMe from "../components/pages/InspireMe";
import MyCommunityPosts from "../components/pages/MyCommunityPosts";
import AccountActivationPage from "../components/pages/AccountActivationPage";
import PasswordResetPage from "../components/pages/PasswordResetPage";
import MyAttendingPage from "../components/pages/MyAttendingPage";
import MySubscriptionsPage from "../components/pages/MySubscriptionsPage";
import Overlay from "../components/Overlay";

import { setAuthToken } from "../utils/API";

export const history = createHistory();

class AppRouter extends React.Component {
    componentWillMount() {
        this.props.onTryAutoSignup();
        setAuthToken(localStorage.getItem("token"));
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Overlay history={history}>
                        <div className="contentBody">
                            <Switch>
                                <Route path="/" component={DashboardPage} exact={true} />
                                <PrivateRoute path="/myChannels/" component={MyChannelsPage} exact={true} />
                                <PrivateRoute path="/channels/:id" component={ViewChannelPage} exact={true} />
                                <PrivateRoute path="/myChannels/:id/addPost" component={AddPostPage} exact={true} />
                                <PrivateRoute path="/myPosts/:id/edit" component={EditPostPage} exact={true} />
                                <PrivateRoute path="/post/:id" component={ViewPostPage} exact={true} />
                                <PrivateRoute path="/post-events/:id" component={ViewPostEventsPage} exact={true} />
                                <PrivateRoute path="/event/:id" component={ViewEventPage} exact={true} />
                                <PrivateRoute path="/myChannels/edit/:id" component={EditChannelPage} exact={true} />
                                <PrivateRoute path="/addChannel" component={AddChannelPage} exact={true} />
                                <PrivateRoute path="/interests" component={InterestsPage} exact={true} />
                                />
                                <PrivateRoute path="/communities" component={CommunitiesPage} exact={true} />
                                <PrivateRoute path="/myPosts/:id/addEvent" component={AddEventPage} exact={true} />
                                <PrivateRoute path="/channel/:id/" component={ViewChannelPage} exact={true} />
                                <PrivateRoute
                                    path="/myPosts/:id/events/:event_id/edit"
                                    component={EditEventPage}
                                    exact={true}
                                />
                                <PrivateRoute
                                    path="/myEvents/:id/addIncentive"
                                    component={AddEventIncentivePage}
                                    exact={true}
                                />
                                <PrivateRoute
                                    path="/myEvents/:id/editIncentive"
                                    component={EditEventIncentivePage}
                                    exact={true}
                                />
                                <PrivateRoute
                                    path="/myPosts/:id/addIncentive"
                                    component={AddIncentivePage}
                                    exact={true}
                                />
                                <PrivateRoute
                                    path="/myPosts/:id/editIncentive"
                                    component={EditIncentivePage}
                                    exact={true}
                                />
                                <PrivateRoute path="/searchResults/:text" component={SearchResultsPage} exact={true} />
                                <PrivateRoute path="/myDeletedContent" component={DeletedContentPage} exact={true} />
                                <PrivateRoute path="/food_mood" component={FreeFoodPage} exact={true} />
                                <PrivateRoute path="/inspire_me" component={InspireMe} exact={true} />
                                <PrivateRoute path="/community_posts" component={MyCommunityPosts} exact={true} />
                                <PrivateRoute path="/my_attending" component={MyAttendingPage} exact={true} />
                                <PrivateRoute path="/my_subscriptions" component={MySubscriptionsPage} exact={true} />
                                <PublicRoute
                                    path="/activate/:uid/:token"
                                    component={AccountActivationPage}
                                    exact={true}
                                />
                                <PublicRoute path="/password_reset/:token" component={PasswordResetPage} exact={true} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </div>
                    </Overlay>
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
