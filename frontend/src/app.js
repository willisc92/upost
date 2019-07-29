import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import LoadingPage from "./components/pages/LoadingPage";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <MuiThemeProvider theme={theme}>
                <AppRouter />
            </MuiThemeProvider>
        </MuiPickersUtilsProvider>
    </Provider>
); // Use provider to setup the store in the root of the application that is used by all other components.

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};

renderApp();
