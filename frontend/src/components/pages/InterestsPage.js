import React from "react";
import API from "../../utils/API";
import Interest from "../Interest";

class InterestsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interests: []
        };
    }

    componentDidMount() {
        API.get("interests/").then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    interests: result.data
                });
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

export default InterestsPage;
