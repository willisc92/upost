import React from "react";
import { connect } from "react-redux";
import API from "../../utils/API";
import Interest from "../Interest";
import { startSetUserInterests } from "../../actions/interests";

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

        console.log(interestsWithSelected);

        this.setState(() => ({ interests: interestsWithSelected }));

        console.log(this.state);
    };

    getUserInterests = () => {
        this.props.startSetUserInterests().then(() => {
            console.log(this.props.userInterests);
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
                        return <Interest interest={interest} key={interest.interest_tag} />;
                    })}
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
        startSetUserInterests: () => dispatch(startSetUserInterests())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterestsPage);
