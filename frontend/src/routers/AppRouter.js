import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import DashboardPage from "../components/DashboardPage";
// import NotFoundPage from "../components/NotFoundPage";
// import PrivateRoute from "./PrivateRoute";
// import PublicRoute from "./PublicRoute";
import ChannelList from "../components/ChannelList";
import SignUpPage from "../components/SignUpPage";
import { connect } from "react-redux";
import { authCheckState } from "../actions/auth";
import LoginPage from "../components/LoginPage";
import Header from "../components/Header";
import NotFoundPage from "../components/NotFoundPage";

export const history = createHistory();

class AppRouter extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" component={DashboardPage} exact={true} />
                        <Route path="/login" component={LoginPage} exact={true} />
                        <Route path="/signup" component={SignUpPage} exact={true} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

// const AppRouter = () => (
//     <Router history={history}>
//         <div>
//             <Switch>
//                 <PublicRoute path="/" component={LoginPage} exact={true} />
//                 <PrivateRoute path="/dashboard" component={DashboardPage} />
//                 <Route component={NotFoundPage} />
//             </Switch>
//         </div>
//     </Router>
// );

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
