import React from "react";
import { connect } from "react-redux";
import { startGetIncentiveTypes } from "../../actions/incentive_types";
import { startGetDietOptions } from "../../actions/diet_options";
import DateTimePicker from "react-datetime-picker";

class IncentiveForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: !!this.props.incentivePackage ? this.props.incentivePackage.post.post_id : this.props.post_id,
            diet_option: !!this.props.incentivePackage ? this.props.incentivePackage.diet_option : [],
            incentive_type: !!this.props.incentivePackage ? this.props.incentivePackage.incentive_type : null,
            ip_description: !!this.props.incentivePackage ? this.props.incentivePackage.ip_description : "",
            planned_start_date: !!this.props.incentivePackage
                ? new Date(this.props.incentivePackage.planned_start_date)
                : new Date(),
            planned_end_date: !!this.props.incentivePackage
                ? new Date(this.props.incentivePackage.planned_end_date)
                : new Date(new Date().setHours(new Date().getHours() + 1))
        };
    }

    componentWillMount() {
        this.props
            .startGetIncentiveTypes()
            .then(() => {
                this.props
                    .startGetDietOptions()
                    .then(() => {})
                    .catch((error) => {
                        console.log(JSON.stringify(error, null, 2));
                    });
            })
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
    }

    render() {
        return <div>INSERT FORM HERE.</div>;
    }
}

const mapStateToProps = (state) => ({
    loading:
        !!state.incentivetypes && !!state.dietOptions && (state.incentiveTypes.loading || state.dietOptions.loading),
    incentiveTypesError: !!state.incentiveTypes.error && state.incentiveTypes.error.response.data,
    incentiveTypes: !!state.incentiveTypes && state.incentiveTypes.incentiveTypes,
    dietOptionsError: !!state.dietOptions.error && state.dietOptions.error.response.data,
    dietOptions: !!state.dietOptions && state.dietOptions.dietOptions
});

const mapDispatchToProps = (dispatch) => ({
    startGetIncentiveTypes: () => dispatch(startGetIncentiveTypes()),
    startGetDietOptions: () => dispatch(startGetDietOptions())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IncentiveForm);
