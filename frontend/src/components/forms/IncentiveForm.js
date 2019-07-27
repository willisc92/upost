import React from "react";
import { connect } from "react-redux";
import { startGetIncentiveTypes } from "../../actions/incentive_types";
import { startGetDietOptions } from "../../actions/diet_options";
import DateTimePicker from "react-datetime-picker";
import { getCurrentUser } from "../../actions/auth";
import moment, { normalizeUnits } from "moment";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";

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

    onStartDateChange = (e) => {
        const planned_start_date = new Date(e.target.value);

        this.setState(() => ({
            planned_start_date
        }));
    };

    onEndDateChange = (e) => {
        const planned_end_date = new Date(e.target.value);

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
                <Box paddingBottom={3}>
                    {!!this.props.incentivePackageError && (
                        <Typography color="error" gutterBottom>
                            Request failed...
                        </Typography>
                    )}
                    {!!this.state.error && (
                        <Typography color="error" gutterBottom>
                            {this.state.error}
                        </Typography>
                    )}
                </Box>
                <Box>
                    <TextField
                        required
                        autoFocus
                        label="Incentive Description"
                        placeholder="Description"
                        value={this.state.ip_description}
                        onChange={this.onDescriptionChange}
                        disabled={this.props.read_only}
                    />
                </Box>
                {!!this.state.fromEvent && (
                    <React.Fragment>
                        <Box>
                            <TextField
                                required
                                label="Start Date"
                                type="datetime-local"
                                placeholder="Start Date"
                                disabled={this.props.read_only}
                                onChange={this.onStartDateChange}
                                value={moment(this.state.planned_start_date)
                                    .format("YYYY-MM-DDTHH:mm")
                                    .toString()}
                            />
                        </Box>
                        <Box>
                            <TextField
                                required
                                label="End Date"
                                type="datetime-local"
                                placeholder="End Date"
                                disabled={this.props.read_only}
                                onChange={this.onEndDateChange}
                                value={moment(this.state.planned_end_date)
                                    .format("YYYY-MM-DDTHH:mm")
                                    .toString()}
                            />
                        </Box>
                    </React.Fragment>
                )}
                {!!this.props.incentiveTypes && (
                    <Box display="flex">
                        <Box paddingRight={2}>
                            <Typography>Incentive Types:</Typography>
                        </Box>
                        <Select
                            required
                            native
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
                        </Select>
                    </Box>
                )}
                {this.state.incentive_type.includes("Food") && (
                    <Box display="flex">
                        <Box paddingRight={2}>
                            <Typography>Diet Options:</Typography>
                        </Box>
                        <Select
                            multiple
                            native
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
                        </Select>
                    </Box>
                )}

                <div>
                    {!this.props.read_only && (
                        <Button color="primary" variant="contained" type="submit">
                            {this.props.nextStep}
                        </Button>
                    )}
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
