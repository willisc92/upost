import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
// import DashboardPage from "../components/DashboardPage";
// import NotFoundPage from "../components/NotFoundPage";
// import LoginPage from "../components/LoginPage";
// import PrivateRoute from "./PrivateRoute";
// import PublicRoute from "./PublicRoute";
import ChannelList from "../components/ChannelList";
import { connect } from "react-redux";
import { authCheckState } from "../actions/auth";
import CustomLayout from "../containers/CustomLayout";

export const history = createHistory();

class AppRouter extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <CustomLayout {...this.props}>
                            <Route path="/" component={ChannelList} exact={true} />
                        </CustomLayout>
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
        isAuthenticated: state.auth.token !== null
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
