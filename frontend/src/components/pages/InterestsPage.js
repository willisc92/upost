import React from "react";
import { connect } from "react-redux";
import API from "../../utils/API";
import Interest from "../Interest";
import { startSetUserInterests, startEditUserInterests } from "../../actions/interests";

class InterestsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interests: []
        };
    }

    markSelectedInterests = () => {
        let interestsWithSelected = this.state.interests.map((interest) => {
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
        API.get("interests/").then(
            (result) => {
                this.setState(
                    {
                        isLoaded: true,
                        interests: result.data
                    },
                    this.getUserInterests
                );
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
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
                this.props.history.push("/");
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
                    <button className="button" onClick={this.submitChanges}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInterests: state.userInterests.userInterests
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetUserInterests: () => dispatch(startSetUserInterests()),
        startEditUserInterests: (userInterests) => dispatch(startEditUserInterests(userInterests))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterestsPage);
