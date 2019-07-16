import React from "react";
import { connect } from "react-redux";
import { startGetIncentiveTypes } from "../../actions/incentive_types";
import { startGetDietOptions } from "../../actions/diet_options";
import DateTimePicker from "react-datetime-picker";
import { getCurrentUser } from "../../actions/auth";
import moment, { normalizeUnits } from "moment";

class IncentiveForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fromPost: !!this.props.fromPost,
            fromEvent: !!this.props.fromEvent,
            post: !!this.props.incentivePackage
                ? this.props.incentivePackage.post
                : !!this.props.post
                ? this.props.post
                : null,
            event: !!this.props.incentivePackage
                ? this.props.incentivePackage.event
                : !!this.props.event
                ? this.props.event.event_id
                : null,
            diet_option: !!this.props.incentivePackage ? this.props.incentivePackage.diet_option : [],
            incentive_type: !!this.props.incentivePackage ? this.props.incentivePackage.incentive_type : [],
            ip_description: !!this.props.incentivePackage
                ? this.props.incentivePackage.ip_description
                : !!this.props.description
                ? this.props.description
                : "",
            planned_start_date:
                !!this.props.incentivePackage && !!this.props.incentivePackage.planned_start_date
                    ? moment(this.props.incentivePackage.planned_start_date).toDate()
                    : !!this.props.event && !!this.props.event.planned_start_date
                    ? moment(this.props.event.planned_start_date).toDate()
                    : !!this.props.fromEvent
                    ? moment().toDate()
                    : null,
            planned_end_date:
                !!this.props.incentivePackage && !!this.props.incentivePackage.planned_end_date
                    ? moment(this.props.incentivePackage.planned_end_date).toDate()
                    : !!this.props.event && !!this.props.event.planned_end_date
                    ? moment(this.props.event.planned_end_date).toDate()
                    : !!this.props.fromEvent
                    ? moment()
                          .add(1, "hours")
                          .toDate()
                    : null
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
        let incentive_type = [];
        const options = e.target.options;
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                incentive_type.push(options[i].value);
            }
        }

        this.setState(() => ({
            incentive_type
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
        if (this.state.incentive_type.length === 0) {
            this.setState(() => ({ error: "Please select at least one incentive type." }));
        } else if (!this.state.ip_description) {
            this.setState(() => ({ error: "Please enter a brief description." }));
        } else if (
            !!this.state.planned_end_date &&
            !!this.state.planned_start_date &&
            this.state.planned_end_date <= this.state.planned_start_date
        ) {
            this.setState(() => ({ error: "End datetime must be after start datetime." }));
        } else if (this.state.incentive_type.includes("Food") && this.state.diet_option.length === 0) {
            this.setState(() => ({ error: "Must have at least one diet option selected" }));
        } else {
            getCurrentUser()
                .then((res) => {
                    this.setState(() => ({ error: "" }));
                    const payload = {
                        post: this.state.post,
                        event: this.state.event,
                        user: res.data.id,
                        diet_option: this.state.diet_option,
                        incentive_type: this.state.incentive_type,
                        ip_description: this.state.ip_description,
                        planned_start_date: this.state.planned_start_date,
                        planned_end_date: this.state.planned_end_date
                    };
                    this.props.onSubmit(payload);
                    console.log(payload);
                })
                .catch((err) => {
                    console.log(err);
                    console.log(JSON.stringify(err, null, 2));
                });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                <div className="input-group-column">
                    {!!this.props.incentivePackageError && <p className="form__error">Request failed...</p>}
                    {!!this.state.error && <p className="form__error">{this.state.error}</p>}
                    <p className="form__error">* - Fields required</p>
                </div>
                <div className="input-group">
                    <p className="form__label">Description*: </p>
                    <textarea
                        className="textarea"
                        type="text"
                        placeholder="Description"
                        value={this.state.ip_description}
                        onChange={this.onDescriptionChange}
                        disabled={this.props.read_only}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">
                        Incentive Type* (Hold down "Control", or "Command" on a Mac, to select more than one.):{" "}
                    </p>
                    <select
                        multiple
                        disabled={this.props.read_only}
                        onChange={this.onIncentiveTypeChange}
                        value={this.state.incentive_type}
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
                {this.state.incentive_type.includes("Food") && (
                    <div className="input-group">
                        <p className="form__label">
                            Diet Options* (Hold down "Control", or "Command" on a Mac, to select more than one.):{" "}
                        </p>
                        <select
                            multiple
                            onChange={this.onDietOptionsChange}
                            value={this.state.diet_option}
                            disabled={this.props.read_only}
                        >
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
                {!!this.state.fromEvent && (
                    <div>
                        <div className="input-group">
                            <p className="form__label">Start Date*:</p>
                            <DateTimePicker
                                disabled={this.props.read_only}
                                onChange={this.onStartDateChange}
                                value={this.state.planned_start_date}
                                clearIcon={null}
                            />
                            <div />
                        </div>
                        <div className="input-group">
                            <p className="form__label">End Date*:</p>
                            <DateTimePicker
                                disabled={this.props.read_only}
                                onChange={this.onEndDateChange}
                                value={this.state.planned_end_date}
                                clearIcon={null}
                            />
                            <div />
                        </div>
                    </div>
                )}
                <div>{!this.props.read_only && <button className="button">{this.props.nextStep}</button>}</div>
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
