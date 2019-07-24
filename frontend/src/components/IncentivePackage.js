import React from "react";
import { connect } from "react-redux";
import { startGetIncentiveTypes } from "../actions/incentive_types";

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
            <table>
                <tbody>
                    {this.props.package.incentive_type.includes("Food") && (
                        <tr>
                            <td>{!!food && <img src={food.incentive_image} />}</td>
                            <td>{!!food && food.incentive_name}</td>
                        </tr>
                    )}
                    {!!this.props.package.diet_option &&
                        this.props.package.diet_option.map((option) => {
                            return (
                                <tr key={option}>
                                    <td />
                                    <td>{option}</td>
                                </tr>
                            );
                        })}
                </tbody>
                <tbody>
                    {this.props.package.incentive_type.map((type) => {
                        if (type === "Food") {
                            return;
                        } else {
                            return (
                                <tr key={type}>
                                    <td>
                                        {!!this.props.incentives.find((incentive) => {
                                            return incentive.incentive_name === type;
                                        }) && (
                                            <img
                                                src={
                                                    this.props.incentives.find((incentive) => {
                                                        return incentive.incentive_name === type;
                                                    }).incentive_image
                                                }
                                            />
                                        )}
                                    </td>
                                    <td>{type}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
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
