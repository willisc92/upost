import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

export const Header = ({ logout, token }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link to="/">
                    <img className="header__logo" src="/images/logo.png" />
                </Link>
                {!!token ? (
                    <div>
                        <Link className="button button--link" to="/myChannels">
                            My Content
                        </Link>
                        <button className="button button--link" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <Link className="button button--link" to="/login">
                            Login
                        </Link>
                        <Link className="button button--link" to="/signup">
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </header>
);

const mapStateToProps = (state) => ({
    token: !!state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
