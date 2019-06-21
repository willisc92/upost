import React from "react";

export class ReOccuringForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reOccuringFrequency: "", // Can be blank, daily, bi-weekly, or monthly
            endSelection: "", // Will become numOccurences or onDate
            endSelectionValue: null // Will either be a +int or a date object.
        };
    }

    // Method to handleReoccuringEventFrequency
    onFrequencyChange = (e) => {
        this.setState({ reOccuringFrequency: e.target.value });
    };

    // Method to handleEndSelection
    handleEndSelection = (e) => {
        this.setState({ endSelection: e.target.value }); // endSelection will be Occurences or OnDate
    };

    // Method to handle # Occurences Selector
    // handleNumOccurences = (e) => {
    //     if (e.target.value > 0 and is an integer){
    //     this.setState({ numOccurences = e.target.value})
    //     }
    // }

    // Method to handle EndDate Selector
    // handleReOccuringEndDateSelection = (e) => {
    //     this.setState({ reOccuringEndDate = e.target.value });
    // }

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

    // MaxDate gets passed to DateRangePicker as a prop.
    // Method on Submit:  Add reOccuringEvent (str = "", daily, bi-weekly, monthly), endSelection = (obj = { type: "# occurences/EndDate", value: # occurences/EndDate obj})
    // Additional Checks: Check if endSelection.type === EndDate && endSelection.value > endDate (from original form).

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <p className="form__label">Re-Occuring Frequency</p>
                        <select onChange={this.onFrequencyChange} defaultValue="daily">
                            <option key="daily" value="daily">
                                Daily
                            </option>
                            <option key="bi-weekly" value="bi-weekly">
                                Bi-Weekly
                            </option>
                            <option key="monthly" value="monthly">
                                Monthly
                            </option>
                        </select>
                    </div>
                    <div className="input-group">
                        <p className="form__label">Re-Occuring Selection</p>
                        <select onChange={this.onFrequencyChange} defaultValue="numOccurence">
                            <option key="numOccurence" value="numOccurence">
                                Number of Occurences
                            </option>
                            <option key="onDate" value="onDate">
                                End Date
                            </option>
                        </select>
                    </div>
                    <button>Save Re-Occuring Settings</button>
                </form>
            </div>
        );
        // Within render()
        // Dynamically render selection for reoccuringEvent...
        // -Render single checkbox select: blank, daily, bi-weekly, monthly
        // -Render End selection: # Occurences OR OnDate
        //     -Dynamically render # Occurences or EndDate Selector.
    }
}
