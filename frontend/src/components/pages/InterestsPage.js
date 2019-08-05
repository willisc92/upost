import React from "react";
import { connect } from "react-redux";
import Interest from "../Interest";
import { getAllInterests, startSetUserInterests, startEditUserInterests } from "../../actions/interests";
import { getMyCommunities } from "../../actions/communities";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

export class InterestsPage extends React.Component {
    _isMounted = false;

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

        if (this._isMounted) {
            this.setState(() => ({ interests: interestsWithSelected }));
        }
    };

    getUserInterests = () => {
        this.props.startSetUserInterests().then(() => {
            this.markSelectedInterests();
        });
    };

    componentDidMount() {
        this._isMounted = true;

        this.props.getMyCommunities();

        if (this.props.interests.length === 0) {
            this.props
                .getAllInterests()
                .then(() => {
                    if (this._isMounted) {
                        this.setState(() => ({
                            isLoaded: true
                        }));
                    }
                    this.getUserInterests();
                })
                .catch((error) => {
                    if (this._isMounted) {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                });
        } else {
            this.getUserInterests();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                if (this.props.userCommunities.length === 0) {
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
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" gutterBottom>
                            Let's get to know you
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Please choose 1 or more Interests. When we know what you are passionate about we can find
                            better events for you.
                        </Typography>
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    <Box display="flex" flexWrap="wrap">
                        {this.state.interests.map((interest) => {
                            return (
                                <Interest
                                    interest={interest}
                                    changeIsSelected={this.changeIsSelected}
                                    key={interest.interest_tag}
                                />
                            );
                        })}
                    </Box>
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        style={{ display: "block", margin: "auto" }}
                        onClick={this.submitChanges}
                    >
                        Submit
                    </Button>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        interests: state.interests.interests,
        userInterests: state.interests.userInterests,
        userCommunities: state.communities.userCommunities.community
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterests: () => dispatch(getAllInterests()),
        startSetUserInterests: () => dispatch(startSetUserInterests()),
        startEditUserInterests: (userInterests) => dispatch(startEditUserInterests(userInterests)),
        getMyCommunities: () => dispatch(getMyCommunities())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterestsPage);
