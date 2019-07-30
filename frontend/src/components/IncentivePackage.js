import React from "react";
import { connect } from "react-redux";
import { startGetIncentiveTypes } from "../actions/incentive_types";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import InfoIcon from "@material-ui/icons/Info";
import MessageModal from "../components/modals/MessageModal";

class IncentivePackage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openMessageModal: false
        };
    }

    componentDidMount() {
        if (!!this.props.incentives && this.props.incentives.length === 0) {
            this.props.startGetIncentiveTypes();
        }
    }

    closeMessageModal = () => {
        this.setState(() => {
            return { openMessageModal: false };
        });
    };

    showDietOptions = () => {
        this.setState(() => {
            return { openMessageModal: true };
        });
    };

    render() {
        const food = this.props.incentives.find((incentive) => {
            return incentive.incentive_name === "Food";
        });

        return (
            <div>
                <div className="box-centered">
                    {this.props.package.incentive_type.includes("Food") && !!food && (
                        <Chip
                            color="primary"
                            label={food.incentive_name}
                            style={{ margin: 5 }}
                            avatar={<Avatar src={food.incentive_image} />}
                            deleteIcon={<InfoIcon style={{ color: "white" }} />}
                            clickable
                            onDelete={this.showDietOptions}
                            onClick={this.showDietOptions}
                        />
                    )}
                    {this.props.package.incentive_type.map((type) => {
                        if (
                            !!this.props.incentives.find((incentive) => {
                                return incentive.incentive_name === type && incentive.incentive_name !== "Food";
                            })
                        ) {
                            return (
                                <Chip
                                    color="primary"
                                    label={type}
                                    style={{ margin: 5 }}
                                    avatar={
                                        <Avatar
                                            src={
                                                this.props.incentives.find((incentive) => {
                                                    return incentive.incentive_name === type;
                                                }).incentive_image
                                            }
                                        />
                                    }
                                    key={type}
                                />
                            );
                        }
                    })}
                </div>
                {!!this.props.package.diet_option && (
                    <MessageModal
                        isOpen={this.state.openMessageModal}
                        closeMessageModal={this.closeMessageModal}
                        message={this.props.package.diet_option.join(", ")}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    incentives: state.incentiveTypes.incentiveTypes
});

const mapDispatchToProps = (dispatch) => ({
    startGetIncentiveTypes: () => {
        dispatch(startGetIncentiveTypes());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IncentivePackage);
