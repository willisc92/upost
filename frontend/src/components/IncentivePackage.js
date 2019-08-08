import React from "react";
import { connect } from "react-redux";
import { startGetIncentiveTypes } from "../actions/incentive_types";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import InfoIcon from "@material-ui/icons/Info";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const DietOptionsMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <React.Fragment>
            <Chip
                color="primary"
                label={props.food.incentive_name}
                style={{ margin: 5 }}
                avatar={<Avatar src={props.food.incentive_image} />}
                deleteIcon={<InfoIcon style={{ color: "white" }} />}
                clickable
                onDelete={handleClick}
                onClick={handleClick}
            />
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {props.diet_option.map((option) => {
                    return <MenuItem key={option}>{option}</MenuItem>;
                })}
            </Menu>
        </React.Fragment>
    );
};

class IncentivePackage extends React.Component {
    componentDidMount() {
        if (!!this.props.incentives && this.props.incentives.length === 0) {
            this.props.startGetIncentiveTypes();
        }
    }

    render() {
        const food = this.props.incentives.find((incentive) => {
            return incentive.incentive_name === "Food";
        });

        return (
            <React.Fragment>
                <Box display="flex" justifyContent="center" flexWrap="wrap" py={2}>
                    {this.props.package.incentive_type.includes("Food") &&
                        !!food &&
                        !!this.props.package.diet_option && (
                            <DietOptionsMenu diet_option={this.props.package.diet_option} food={food} />
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
                </Box>
                <Typography variant="body1">Perks description: {this.props.package.ip_description}</Typography>
            </React.Fragment>
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
