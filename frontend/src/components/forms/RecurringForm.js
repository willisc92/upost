import React from "react";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CheckBox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import { DatePicker } from "@material-ui//pickers";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import moment from "moment";

export class RecurringForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recurringFrequency: this.props.lastSelection ? this.props.lastSelection.recurringFrequency : "none",
            endSelection: this.props.lastSelection ? this.props.lastSelection.endSelection : "none",
            numOccurences: this.props.lastSelection ? this.props.lastSelection.numOccurences : 0,
            endDate: this.props.lastSelection ? moment(this.props.lastSelection.endDate) : null,
            error: null,
            byweekday: this.props.lastSelection
                ? this.props.lastSelection.byweekday
                : [
                      { id: 0, value: "0", label: "Monday", isChecked: false },
                      { id: 1, value: "1", label: "Tuesday", isChecked: false },
                      { id: 2, value: "2", label: "Wednesday", isChecked: false },
                      { id: 3, value: "3", label: "Thursday", isChecked: false },
                      { id: 4, value: "4", label: "Friday", isChecked: false },
                      { id: 5, value: "5", label: "Saturday", isChecked: false },
                      { id: 6, value: "6", label: "Sunday", isChecked: false }
                  ],
            allChecked: false
        };
    }

    onFrequencyChange = (e) => {
        e.persist();
        if (e.target.value === "none") {
            this.setState(() => ({
                recurringFrequency: "none",
                endSelection: "none",
                numOccurences: 0,
                endDate: null,
                error: null,
                byweekday: [
                    { id: 0, value: "0", label: "Monday", isChecked: false },
                    { id: 1, value: "1", label: "Tuesday", isChecked: false },
                    { id: 2, value: "2", label: "Wednesday", isChecked: false },
                    { id: 3, value: "3", label: "Thursday", isChecked: false },
                    { id: 4, value: "4", label: "Friday", isChecked: false },
                    { id: 5, value: "5", label: "Saturday", isChecked: false },
                    { id: 6, value: "6", label: "Sunday", isChecked: false }
                ],
                allChecked: false
            }));
        } else {
            this.setState({ recurringFrequency: e.target.value });
        }
    };

    handleEndSelection = (e) => {
        e.persist();
        this.setState(() => ({ endSelection: e.target.value }));
    };

    handleNumOccurences = (e) => {
        e.persist();
        if (e.target.value > 0) {
            this.setState(() => ({ numOccurences: e.target.value }));
        }
    };

    handleEndDateChange = (endDate) => {
        this.setState(() => ({ endDate }));
    };

    onSubmit = (e) => {
        let payload;
        e.preventDefault();
        if (this.state.recurringFrequency !== "none") {
            if (this.state.endSelection === "none") {
                this.setState(() => ({ error: "Enter a way to end recurrence" }));
                return;
            } else if (this.state.endSelection === "onDate") {
                if (!this.state.endDate) {
                    this.setState(() => ({ error: "Enter an end date for recurrence" }));
                    return;
                } else if (!this.state.endDate.isValid()) {
                    this.setState(() => ({ error: "Please enter a valid date to end recurrence" }));
                    return;
                }
            } else if (this.state.endSelection === "numOccurences") {
                if (this.state.numOccurences < 1) {
                    this.setState(() => ({ error: "Must have at least one occurence" }));
                    return;
                }
            }
        }

        payload = {
            recurringFrequency: this.state.recurringFrequency,
            endSelection: this.state.endSelection,
            numOccurences: this.state.numOccurences,
            endDate: !!this.state.endDate && this.state.endDate.toDate(),
            byweekday: this.state.byweekday
        };

        this.props.onSubmit(payload);
    };

    handleClear = () => {
        this.setState({
            recurringFrequency: "none",
            endSelection: "none",
            numOccurences: 0,
            endDate: null,
            error: null,
            byweekday: [
                { id: 0, value: "0", label: "Monday", isChecked: false },
                { id: 1, value: "1", label: "Tuesday", isChecked: false },
                { id: 2, value: "2", label: "Wednesday", isChecked: false },
                { id: 3, value: "3", label: "Thursday", isChecked: false },
                { id: 4, value: "4", label: "Friday", isChecked: false },
                { id: 5, value: "5", label: "Saturday", isChecked: false },
                { id: 6, value: "6", label: "Sunday", isChecked: false }
            ],
            allChecked: false
        });
    };

    handleRecurringFocus = (e) => {
        e.target.value = this.state.recurringFrequency;
    };

    handleEndSelectionFocus = (e) => {
        e.target.value = this.state.endSelection;
    };

    handleAllChecked = (event) => {
        let byweekday = this.state.byweekday;
        byweekday.forEach((day) => (day.isChecked = event.target.checked));
        this.setState({ byweekday, allChecked: event.target.checked });
    };

    handleCheckChildElement = (event) => {
        let byweekday = this.state.byweekday;
        byweekday.forEach((day) => {
            if (day.value === event.target.id) day.isChecked = event.target.checked;
        });
        this.setState({ byweekday });
    };

    render() {
        return (
            <div>
                {!!this.state.error && (
                    <Typography variant="h6" color="error" gutterBottom>
                        {this.state.error}
                    </Typography>
                )}
                <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                    <Box display="flex" py={1}>
                        <Box paddingRight={1}>
                            <Typography>Recurring Frequency: </Typography>
                        </Box>
                        <Box bgcolor="white" padding={1}>
                            <Select
                                onChange={this.onFrequencyChange}
                                value={this.state.recurringFrequency}
                                onFocus={this.handleRecurringFocus}
                                label="Recurring Frequency"
                            >
                                <MenuItem key="none" value="none">
                                    None
                                </MenuItem>
                                <MenuItem key="daily" value="daily">
                                    Daily
                                </MenuItem>
                                <MenuItem key="weekly" value="weekly">
                                    Weekly
                                </MenuItem>
                                <MenuItem key="monthly" value="monthly">
                                    Monthly
                                </MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    {this.state.recurringFrequency !== "none" && (
                        <Box display="flex" paddingBottom={1}>
                            <Box paddingRight={1}>
                                <Typography>Recurring Selection: </Typography>
                            </Box>
                            <Box bgcolor="white" padding={1}>
                                <Select
                                    onChange={this.handleEndSelection}
                                    value={this.state.endSelection}
                                    onFocus={this.handleEndSelectionFocus}
                                >
                                    <MenuItem key="none" value="none">
                                        None
                                    </MenuItem>
                                    <MenuItem key="numOccurence" value="numOccurence">
                                        Number of Occurences
                                    </MenuItem>
                                    <MenuItem key="onDate" value="onDate">
                                        End Date
                                    </MenuItem>
                                </Select>
                            </Box>
                        </Box>
                    )}
                    {this.state.recurringFrequency !== "none" && this.state.endSelection === "numOccurence" && (
                        <Box display="flex" paddingBottom={1}>
                            <Box paddingRight={1}>
                                <Typography>Number of Occurences: </Typography>
                            </Box>
                            <Box bgcolor="white" padding={1}>
                                <Input
                                    type="number"
                                    value={this.state.numOccurences}
                                    onChange={this.handleNumOccurences}
                                    min="1"
                                />
                            </Box>
                        </Box>
                    )}
                    {this.state.recurringFrequency !== "none" && this.state.endSelection === "onDate" && (
                        <div>
                            <Box display="flex" paddingBottom={1}>
                                <Box paddingRight={1}>
                                    <Typography>Re-occur Until: </Typography>
                                </Box>
                                <Box bgcolor="white" padding={1}>
                                    <DatePicker
                                        value={this.state.endDate}
                                        onChange={this.handleEndDateChange}
                                        disablePast
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" paddingBottom={1}>
                                <Box paddingRight={1}>
                                    <Typography>By Weekday: </Typography>
                                </Box>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <CheckBox
                                                onClick={this.handleAllChecked}
                                                checked={this.state.allChecked}
                                                color="primary"
                                            />
                                        }
                                        label="Check/Uncheck All"
                                        labelPlacement="end"
                                    />
                                    {this.state.byweekday.map((day) => {
                                        return (
                                            <FormControlLabel
                                                key={day.id}
                                                control={
                                                    <CheckBox
                                                        id={day.id.toString()}
                                                        label={day.label}
                                                        checked={day.isChecked}
                                                        color="primary"
                                                        onChange={this.handleCheckChildElement}
                                                    />
                                                }
                                                label={day.label}
                                                labelPlacement="end"
                                            />
                                        );
                                    })}
                                </FormGroup>
                            </Box>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
