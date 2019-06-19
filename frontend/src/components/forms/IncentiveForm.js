import React from "react";
import { connect } from "react-redux";
import { startGetIncentiveTypes } from "../../actions/incentive_types";
import { startGetDietOptions } from "../../actions/diet_options";
import DateTimePicker from "react-datetime-picker";

class IncentiveForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: !!this.props.incentivePackage ? this.props.incentivePackage.post.post_id : this.props.post,
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
            .then(() => {})
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
        this.props
            .startGetDietOptions()
            .then(() => {})
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
    }

    determineReadOnly = () => {
        if (this.props.incentivePackage) {
            if (new Date(this.props.incentivePackage.startDate) >= new Date()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    onDescriptionChange = (e) => {
        const ip_description = e.target.value;
        if (!!ip_description) {
            if (ip_description.length > 500) {
                this.setState({ error: "Description must be 500 characters or less" });
            } else {
                this.setState(() => ({ ip_description }));
            }
        } else {
            this.setState(() => ({ ip_description }));
        }
    };

    onDietOptionsChange = (e) => {
        let diet_option = [];
        const options = e.target.options;
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                diet_option.push(options[i].value);
            }
        }
        this.setState(() => ({ diet_option }));
    };

    onIncentiveTypeChange = (e) => {
        e.persist();
        this.setState(() => ({
            incentive_type: e.target.value
        }));
    };

    onStartDateChange = (planned_start_date) => {
        this.setState(() => ({
            planned_start_date
        }));
    };

    onEndDateChange = (planned_end_date) => {
        this.setState(() => ({
            planned_end_date
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.incentive_type) {
            this.setState(() => ({ error: "Please select an incentive type." }));
        } else if (!this.state.ip_description) {
            this.setState(() => ({ error: "Please enter a brief description." }));
        } else if (this.state.planned_end_date <= this.state.planned_start_date) {
            this.setState(() => ({ error: "End datetime must be after start datetime." }));
        } else if (this.state.incentive_type === "Food" && this.state.diet_option.length === 0) {
            this.setState(() => ({ error: "Must have at least one diet option selected" }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.onSubmit({
                post: this.state.post,
                user: localStorage.getItem("user_id"),
                diet_option: this.state.diet_option,
                incentive_type: this.state.incentive_type,
                ip_description: this.state.ip_description,
                planned_start_date: this.state.planned_start_date,
                planned_end_date: this.state.planned_end_date
            });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.incentivePackageError && <p className="form__error">Request failed...</p>}
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <p className="form__error">* - Fields required</p>
                <div className="input-group">
                    <p className="form__label">Description*: </p>
                    <textarea
                        className="textarea"
                        type="text"
                        placeholder="Description"
                        value={this.state.ip_description}
                        onChange={this.onDescriptionChange}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Incentive Type*: </p>
                    <select
                        disabled={this.determineReadOnly()}
                        onChange={this.onIncentiveTypeChange}
                        defaultValue={this.props.incentivePackage ? this.props.incentivePackage.incentive_type : ""}
                    >
                        <option key="empty" value="" />
                        {this.props.incentiveTypes.map((incentiveType) => {
                            return (
                                <option key={incentiveType.incentive_name} value={incentiveType.incentive_name}>
                                    {incentiveType.incentive_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {this.state.incentive_type === "Food" && (
                    <div className="input-group">
                        <p className="form__label">
                            Diet Options* (Hold down "Control", or "Command" on a Mac, to select more than one.):{" "}
                        </p>
                        <select multiple onChange={this.onDietOptionsChange} defaultValue={this.state.diet_option}>
                            {this.props.dietOptions.map((diet_option) => {
                                return (
                                    <option key={diet_option.diet_option} value={diet_option.diet_option}>
                                        {diet_option.diet_option}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                )}
                <div className="input-group">
                    <p className="form__label">Start Date*:</p>
                    <DateTimePicker
                        disabled={this.determineReadOnly()}
                        onChange={this.onStartDateChange}
                        value={this.state.planned_start_date}
                        clearIcon={null}
                        minDate={new Date()}
                    />
                    <div />
                </div>
                <div className="input-group">
                    <p className="form__label">End Date*:</p>
                    <DateTimePicker
                        disabled={this.determineReadOnly()}
                        onChange={this.onEndDateChange}
                        value={this.state.planned_end_date}
                        clearIcon={null}
                        minDate={this.state.planned_start_date}
                    />
                    <div />
                </div>
                <div>
                    <button className="button">Submit Incentive</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    loading:
        !!state.incentivetypes && !!state.dietOptions && (state.incentiveTypes.loading || state.dietOptions.loading),
    incentiveTypesError: !!state.incentiveTypes.error && state.incentiveTypes.error.response.data,
    incentiveTypes: !!state.incentiveTypes && state.incentiveTypes.incentiveTypes,
    dietOptionsError: !!state.dietOptions.error && state.dietOptions.error.response.data,
    dietOptions: !!state.dietOptions && state.dietOptions.dietOptions,
    incentivePackageError: !!state.incentivePackage.error && state.incentivePackage.error.response.data
});

const mapDispatchToProps = (dispatch) => ({
    startGetIncentiveTypes: () => dispatch(startGetIncentiveTypes()),
    startGetDietOptions: () => dispatch(startGetDietOptions())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IncentiveForm);
