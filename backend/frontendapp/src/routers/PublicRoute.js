import React from "react";
// import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        component={(props) => (!!localStorage.getItem("token") ? <Redirect to="/" /> : <Component {...props} />)}
    />
);

export default PublicRoute;

// export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
//     <Route {...rest} component={(props) => (isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)} />
// );

// const mapStateToProps = (state) => ({
//     isAuthenticated: !!state.auth.token
// });

// export default connect(mapStateToProps)(PublicRoute);
