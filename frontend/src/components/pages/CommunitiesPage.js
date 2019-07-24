import React from "react";
import { connect } from "react-redux";
import API from "../../utils/API";
import CommunityCard from "../CommunityCard";
import {
    getMyCommunities,
    startEditUserCommunities,
    getAllCommunities
} from "../../actions/communities";

export class CommunitiesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            communities: []
        };
    }

    markSelectedCommunities = () => {
        let communitiesWithSelected = this.props.communities.map(
            (community) => {
                community.isSelected = false;
                return community;
            }
        );

        for (let i = 0; i < communitiesWithSelected.length; i++) {
            // for (let j = 0; j < this.props.userCommunities.length; j++) {
            if (
                this.props.userCommunities.includes(
                    communitiesWithSelected[i].community_name
                )
            ) {
                communitiesWithSelected[i].isSelected = true;
                //  }
            }
        }

        this.setState(() => ({ communities: communitiesWithSelected }));
    };

    getUserCommunities = () => {
        this.props.getMyCommunities().then(() => {
            this.markSelectedCommunities();
        });
    };

    componentDidMount() {
        this.props.getAllCommunities().then(
            () => {
                this.getUserCommunities();
            },
            (error) => {
                this.setState({ isLoaded: true, error });
            }
        );
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
                console.log(
                    "An error has occured with updating communities",
                    error
                );
            });
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page_header__title">
                            Let's choose communities you want to be part of:{" "}
                        </h1>
                        <p>
                            Please choose 1 or more communities. Let us help you
                            show you what is relevant to you.
                        </p>
                    </div>
                </div>
                <div className="content-container">
                    {this.state.communities.map((community) => {
                        return (
                            <CommunityCard
                                community={community}
                                changeIsSelected={this.changeIsSelected}
                                key={community.community_name}
                            />
                        );
                    })}
                    <div className="clearfix" />
                    <button
                        className="button--centered"
                        onClick={this.submitChanges}
                    >
                        Submit
                    </button>
                </div>
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
        startEditUserCommunities: (userCommunities) =>
            dispatch(startEditUserCommunities(userCommunities))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommunitiesPage);
