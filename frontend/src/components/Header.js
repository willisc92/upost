import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import SignupModal from "./modals/SignupModal";
import LoginModal from "./modals/LoginModal";
import { SearchBar } from "./SearchBar";
import { Button, AppBar } from "@material-ui/core";
import { MyAccountMenu } from "./MyAccountMenu";
import { WhiteButton } from "../components/Buttons";
/*import {
    getAllInterests,
    startSetUserInterests,
    startEditUserInterests
} from "../../actions/interests";
import { getMyCommunities } from "../../actions/communities";*/

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginOpen: false,
            signupOpen: false,
            error: undefined
        };
    }

    handleLoginModalOpen = () => {
        this.setState(() => {
            return { loginOpen: true, signupOpen: false };
        });
    };

    handleLoginModalClose = () => {
        this.setState(() => {
            return { loginOpen: false };
        });
    };

    handleSignupModalClose = () => {
        this.setState(() => {
            return { signupOpen: false };
        });
    };

    handleSignupModalOpen = () => {
        this.setState(() => {
            return { signupOpen: true, loginOpen: false };
        });
    };

    moveToInterestPage = () => {
        this.handleSignupModalClose();
        this.props.history.push("/interests");
    };

    closeLoginOpenSignupModal = () => {
        this.handleLoginModalClose();
        this.handleSignupModalOpen();
    };

    closeSignupOpenLoginModal = () => {
        this.handleSignupModalClose();
        this.handleLoginModalOpen();
    };

    handleSucessfulLogin = () => {
        this.handleLoginModalClose();
        this.props.history.push("/");
        /* if (
            this.props.userCommunities.length === 0 &&
            this.props.userInterests.length === 0
        ) {
            this.props.history.push("/interests");
        } else {
            this.props.history.push("/");
        }*/
    };

    render() {
        return (
            <React.Fragment>
                {!!this.props.token && <SearchBar history={this.props.history} />}
                {!!this.props.token ? (
                    <div>
                        <WhiteButton
                            variant="text"
                            onClick={() => {
                                this.props.history.push("/myChannels");
                            }}
                        >
                            <img className="header_mycontent_logo" src={CDNLink + "/dist/images/mycontent.png"} /> My
                            Content
                        </WhiteButton>
                        <MyAccountMenu history={this.props.history} />
                        <WhiteButton variant="text" onClick={this.props.logout}>
                            <i className="material-icons">exit_to_app</i> Logout
                        </WhiteButton>
                    </div>
                ) : (
                    <div>
                        <WhiteButton variant="text" onClick={this.handleLoginModalOpen}>
                            <i className="material-icons">exit_to_app</i> Login
                        </WhiteButton>
                        <WhiteButton variant="text" onClick={this.handleSignupModalOpen}>
                            <i className="material-icons">person_add</i> Signup
                        </WhiteButton>
                    </div>
                )}
                <SignupModal
                    signupOpen={this.state.signupOpen}
                    handleSignupClose={this.handleSignupModalClose}
                    pageMove={this.moveToInterestPage}
                    closeSignupOpenLoginModal={this.closeSignupOpenLoginModal}
                />
                <LoginModal
                    loginOpen={this.state.loginOpen}
                    handleLoginClose={this.handleLoginModalClose}
                    closeLoginOpenSignupModal={this.closeLoginOpenSignupModal}
                    handleSucessfulLogin={this.handleSucessfulLogin}
                />
            </React.Fragment>
        );
    }
}

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
