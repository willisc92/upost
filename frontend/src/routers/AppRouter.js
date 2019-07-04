import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import DashboardPage from "../components/pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MyChannelsPage from "../components/pages/MyChannelsPage";
import { connect } from "react-redux";
import { authCheckState } from "../actions/auth";
import Header from "../components/Header";
import NotFoundPage from "../components/pages/NotFoundPage";
import AddChannelPage from "../components/pages/AddChannelPage";
import InterestsPage from "../components/pages/InterestsPage";
import CommunitiesPage from "../components/pages/CommunitiesPage";
import MyChannelDetail from "../components/pages/MyChannelDetail";
import EditChannelPage from "../components/pages/EditChannelPage";
import AddPostPage from "../components/pages/AddPostPage";
import EditPostPage from "../components/pages/EditPostPage";
import IncentiveForm from "../components/forms/IncentiveForm";
import ViewPostPage from "../components/pages/ViewPostPage";
import ViewPostEventsPage from "../components/pages/ViewPostEventsPage";
import { setAuthToken } from "../utils/API";

import { RecurringTest } from "../components/pages/RecurringTest";

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
          <Header history={history} />
          <div className="contentBody">
            <Switch>
              <Route path="/" component={DashboardPage} exact={true} />
              <PrivateRoute
                path="/myChannels"
                component={MyChannelsPage}
                exact={true}
              />
              <PrivateRoute
                path="/myChannels/:id"
                component={MyChannelDetail}
                exact={true}
              />
              <PrivateRoute
                path="/myChannels/:id/addPost"
                component={AddPostPage}
                exact={true}
              />
              <PrivateRoute
                path="/myPosts/:id/edit"
                component={EditPostPage}
                exact={true}
              />
              <PrivateRoute
                path="/post/:id"
                component={ViewPostPage}
                exact={true}
              />
              <PrivateRoute
                path="/post-events/:id"
                component={ViewPostEventsPage}
                exact={true}
              />
              <PrivateRoute
                path="/myChannels/edit/:id"
                component={EditChannelPage}
                exact={true}
              />
              <PrivateRoute
                path="/addChannel"
                component={AddChannelPage}
                exact={true}
              />
              <PrivateRoute
                path="/interests"
                component={InterestsPage}
                exact={true}
              />
              <PrivateRoute
                path="/communities"
                component={CommunitiesPage}
                exact={true}
              />
              <Route
                path="/RecurringTest"
                component={RecurringTest}
                exact={true}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
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
