import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

export const Header = ({ logout, token }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>UPOST</h1>
                </Link>
                {!!token ? (
                    <button className="button button--link" onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <Link className="button button--link" to="/login">
                        Login
                    </Link>
                )}
            </div>
        </div>
    </header>
);

const mapStateToProps = (state) => ({
    token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
