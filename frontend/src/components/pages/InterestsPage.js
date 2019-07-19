import React from "react";
import { connect } from "react-redux";
import Interest from "../Interest";
import { getAllInterests, startSetUserInterests, startEditUserInterests } from "../../actions/interests";

export class InterestsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interests: []
        };
    }

    markSelectedInterests = () => {
        let interestsWithSelected = this.props.interests.map((interest) => {
            interest.isSelected = false;
            return interest;
        });

        for (let i = 0; i < interestsWithSelected.length; i++) {
            if (this.props.userInterests.includes(interestsWithSelected[i].interest_tag)) {
                interestsWithSelected[i].isSelected = true;
            }
        }

        this.setState(() => ({ interests: interestsWithSelected }));
    };

    getUserInterests = () => {
        this.props.startSetUserInterests().then(() => {
            this.markSelectedInterests();
        });
    };

    componentDidMount() {
        if (this.props.interests.length === 0) {
            this.props
                .getAllInterests()
                .then(() => {
                    this.setState(() => ({
                        isLoaded: true
                    }));
                    this.getUserInterests();
                })
                .catch((error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
        } else {
            this.getUserInterests();
        }
    }

    changeIsSelected = (interest_tag) => {
        const selected = this.state.interests.map((interest) => {
            if (interest.interest_tag === interest_tag) {
                interest.isSelected = !interest.isSelected;
                return interest;
            }
            return interest;
        });

        this.setState({ interests: selected });
    };

    submitChanges = () => {
        const changes = this.state.interests
            .filter((interest) => {
                return interest.isSelected;
            })
            .map((interest) => {
                return interest.interest_tag;
            });

        this.props
            .startEditUserInterests(changes)
            .then(() => {
                // IF this page came from signup - push to communities - else push to home.
                if (!!this.props.location.state && !!this.props.location.state.fromSignup) {
                    this.props.history.push("/communities");
                } else {
                    this.props.history.push("/");
                }
            })
            .catch((error) => {
                console.log("An error has occured with updating interests", error);
            });
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page_header__title">Let's get to know you</h1>
                        <p>
                            Please choose 3 or more Interests. When we know what are are passionate about we can find
                            better events for you
                        </p>
                    </div>
                </div>
                <div className="content-container">
                    {this.state.interests.map((interest) => {
                        return (
                            <Interest
                                interest={interest}
                                changeIsSelected={this.changeIsSelected}
                                key={interest.interest_tag}
                            />
                        );
                    })}
                    <div className="clearfix" />
                    <button className="button--centered" onClick={this.submitChanges}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        interests: state.interests.interests,
        userInterests: state.interests.userInterests
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterests: () => dispatch(getAllInterests()),
        startSetUserInterests: () => dispatch(startSetUserInterests()),
        startEditUserInterests: (userInterests) => dispatch(startEditUserInterests(userInterests))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterestsPage);
