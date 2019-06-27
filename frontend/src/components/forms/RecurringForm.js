import React from "react";
import DatePicker from "react-date-picker";
import CheckBox from "../Checkbox";
import RRule from "rrule";

export class RecurringForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recurringFrequency: this.props.lastSelection ? this.props.lastSelection.recurringFrequency : "none",
            endSelection: this.props.lastSelection ? this.props.lastSelection.endSelection : "none",
            numOccurences: this.props.lastSelection ? this.props.lastSelection.numOccurences : 0,
            endDate: this.props.lastSelection ? this.props.lastSelection.endDate : null,
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
                  ]
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
                ]
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
            endDate: this.state.endDate,
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
            ]
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
        this.setState({ byweekday });
    };

    handleCheckChieldElement = (event) => {
        let byweekday = this.state.byweekday;
        byweekday.forEach((day) => {
            if (day.value === event.target.value) day.isChecked = event.target.checked;
        });
        this.setState({ byweekday });
    };

    render() {
        return (
            <div>
                <div>{!!this.state.error && <p className="form__error">{this.state.error}</p>}</div>
                <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                    <div className="input-group">
                        <p className="form__label">Reoccuring Frequency: </p>
                        <select
                            onChange={this.onFrequencyChange}
                            defaultValue={this.state.recurringFrequency}
                            onFocus={this.handleRecurringFocus}
                        >
                            <option key="none" value="none">
                                None
                            </option>
                            <option key="daily" value="daily">
                                Daily
                            </option>
                            <option key="weekly" value="weekly">
                                Weekly
                            </option>
                            <option key="monthly" value="monthly">
                                Monthly
                            </option>
                        </select>
                    </div>
                    {this.state.recurringFrequency !== "none" && (
                        <div className="input-group">
                            <p className="form__label">Recurring Selection: </p>
                            <select
                                onChange={this.handleEndSelection}
                                defaultValue={this.state.endSelection}
                                onFocus={this.handleEndSelectionFocus}
                            >
                                <option key="none" value="none">
                                    None
                                </option>{" "}
                                <option key="numOccurence" value="numOccurence">
                                    Number of Occurences
                                </option>
                                <option key="onDate" value="onDate">
                                    End Date
                                </option>
                            </select>
                        </div>
                    )}
                    {this.state.recurringFrequency !== "none" && this.state.endSelection === "numOccurence" && (
                        <div className="input-group">
                            <p className="form__label">Number of Occurences: </p>
                            <input
                                className="text-input"
                                type="number"
                                value={this.state.numOccurences}
                                onChange={this.handleNumOccurences}
                                min="1"
                            />
                        </div>
                    )}
                    {this.state.recurringFrequency !== "none" && this.state.endSelection === "onDate" && (
                        <div>
                            <div className="input-group">
                                <p className="form__label">Re-occur Until: </p>
                                <DatePicker
                                    value={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                    minDate={new Date()}
                                    minDetail="decade"
                                />
                            </div>
                            <div className="input-group">
                                <p className="form__label">By-Weekday: </p>
                                <div>
                                    <ul className="nobull">
                                        <li>
                                            <input type="checkbox" onClick={this.handleAllChecked} value="checkedall" />{" "}
                                            Check / Uncheck All
                                        </li>
                                        {this.state.byweekday.map((day) => {
                                            return (
                                                <CheckBox
                                                    handleCheckChieldElement={this.handleCheckChieldElement}
                                                    {...day}
                                                    key={day.id}
                                                />
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
