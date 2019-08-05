import React from "react";
import { connect } from "react-redux";
import CommunityCard from "../CommunityCard";
import { getMyCommunities, startEditUserCommunities, getAllCommunities } from "../../actions/communities";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

export class CommunitiesPage extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            communities: []
        };
    }

    markSelectedCommunities = () => {
        let communitiesWithSelected = this.props.communities.map((community) => {
            community.isSelected = false;
            return community;
        });

        for (let i = 0; i < communitiesWithSelected.length; i++) {
            if (this.props.userCommunities.includes(communitiesWithSelected[i].community_name)) {
                communitiesWithSelected[i].isSelected = true;
            }
        }
        if (this._isMounted) {
            this.setState(() => ({ communities: communitiesWithSelected }));
        }
    };

    getUserCommunities = () => {
        this.props.getMyCommunities().then(() => {
            this.markSelectedCommunities();
        });
    };

    componentDidMount() {
        this._isMounted = true;
        if (this.props.communities.length === 0) {
            this.props.getAllCommunities().then(
                () => {
                    this.getUserCommunities();
                },
                (error) => {
                    if (this._isMounted) {
                        this.setState({ isLoaded: true, error });
                    }
                }
            );
        } else {
            this.getUserCommunities();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    changeIsSelected = (community_name) => {
        const selected = this.state.communities.map((community) => {
            if (community.community_name === community_name) {
                community.isSelected = !community.isSelected;
                return community;
            }
            return community;
        });

        this.setState({ communities: selected });
    };

    submitChanges = () => {
        const changes = this.state.communities
            .filter((community) => {
                return community.isSelected;
            })
            .map((community) => {
                return community.community_name;
            });

        this.props
            .startEditUserCommunities(changes)
            .then(() => {
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log("An error has occured with updating communities", error);
            });
    };

    render() {
        return (
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        <Typography variant="h1" gutterBottom>
                            Let's choose some communities you want to be part of:
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Please choose 1 or more communities. Let us help you show you what is relevant to you.
                        </Typography>
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    <Box display="flex" flexWrap="wrap">
                        {this.state.communities.map((community) => {
                            return (
                                <CommunityCard
                                    community={community}
                                    changeIsSelected={this.changeIsSelected}
                                    key={community.community_name}
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
        userCommunities: state.communities.userCommunities.community,
        communities: state.communities.communities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyCommunities: () => dispatch(getMyCommunities()),
        getAllCommunities: () => dispatch(getAllCommunities()),
        startEditUserCommunities: (userCommunities) => dispatch(startEditUserCommunities(userCommunities))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommunitiesPage);
