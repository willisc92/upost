import React from "react";
import DatePicker from "react-date-picker";

export class RecurringForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recurringFrequency: "none",
            endSelection: "none",
            numOccurences: 0,
            endDate: null,
            error: null
        };
    }

    onFrequencyChange = (e) => {
        this.setState({ recurringFrequency: e.target.value });
    };

    handleEndSelection = (e) => {
        this.setState({ endSelection: e.target.value });
    };

    handleNumOccurences = (e) => {
        if (e.target.value > 0) {
            this.setState({ numOccurences: e.target.value });
        }
    };

    handleEndDateChange = (endDate) => {
        this.setState({ endDate });
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
            recurringFrequency: this.state.reOccuringFrequency,
            endSelection: { type: this.state.endSelection, value: this.mapEndSelectionToValue() }
        };

        // this.props.onSubmit(payload);
        console.log(payload);
    };

    mapEndSelectionToValue = () => {
        switch (this.state.endSelection) {
            case "numOccurence":
                return parseInt(this.state.numOccurences, 10);
            case "onDate":
                return this.state.endDate;
            default:
                return null;
        }
    };

    render() {
        return (
            <div>
                <div>{!!this.state.error && <p className="form__error">{this.state.error}</p>}</div>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <p className="form__label">Reoccuring Frequency: </p>
                        <select onChange={this.onFrequencyChange} defaultValue="none">
                            <option key="none" value="none">
                                None
                            </option>
                            <option key="daily" value="daily">
                                Daily
                            </option>
                            <option key="weekly" value="weekly">
                                Weekly
                            </option>
                            <option key="bi-weekly" value="bi-weekly">
                                Bi-Weekly
                            </option>
                            <option key="monthly" value="monthly">
                                Monthly
                            </option>
                        </select>
                    </div>
                    {this.state.recurringFrequency !== "none" && (
                        <div className="input-group">
                            <p className="form__label">Recurring Selection: </p>
                            <select onChange={this.handleEndSelection} defaultValue="none">
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
                        <div className="input-group">
                            <p className="form__label">Re-occur Until: </p>
                            <DatePicker
                                value={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                minDate={new Date()}
                                minDetail="decade"
                            />
                        </div>
                    )}
                    <button className="button">Save Recurring Event/Incentive Settings</button>
                </form>
            </div>
        );
    }
}

// Function to dynamically set max date of Events
// mapReOccuringEventFrequencyToMaxDate = () => {
//     if (this.state.reOccuringEventFrequency === "daily") {
//         MaxDate = startDate + 1 day.
//     } else if (this.state.reOccuringEventFrequency === "weekly") {
//         MaxDate = startDate + 1 week.
//     } else if (this.state.reOcccuringEventFrequency === "bi-weekly") {
//         MaxDate = startDate + 2 weeks.
//     } else if (this.state.reOcccuringEventFrequency === "monthly") {
//         MaxDate = startDate + 1 month.
//     }
//     else {
//         MaxDate = null;
//     }
//     return MaxDate;
// }
