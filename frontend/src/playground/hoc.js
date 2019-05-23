// Higher Order Component (HOC) - A component (HOC) that renders another component.
// Goal is code reuse.
// Allows for render hijacking, prop manipulation, and abstract state.

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// The two definitions below are regular functions that return a higher order comonent (HOC).
// They wrap any component passed to the functions, and returns a component itself.  Passes all props down to the child using spread operator.

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This information is private. Please don't share.</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => <div>{props.isAuthenticated ? <WrappedComponent {...props} /> : <p>You must login.</p>}</div>;
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="There are the details"/> , document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are the details" />, document.getElementById("app"));
