import React from "react";
import { connect } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import { getCurrentUser } from "../../actions/auth";
import { addDays } from "../../utils/recurring";

export class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: !!this.props.event ? this.props.event.post : this.props.post,
            location: !!this.props.event ? this.props.event.location : "",
            capacity: !!this.props.event ? this.props.event.capacity : "0",
            cost: this.props.event ? (this.props.event.cost / 100).toString() : "0",
            error: "",
            startDate: !!this.props.event ? new Date(this.props.event.planned_start_date) : new Date(),
            endDate: !!this.props.event
                ? new Date(this.props.event.planned_end_date)
                : new Date(new Date().setHours(new Date().getHours() + 1))
        };
    }

    determineReadOnly = () => {
        if (this.props.event) {
            if (new Date(this.props.event.startDate) >= new Date()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    onLocationChange = (e) => {
        const location = e.target.value;
        if (!!location) {
            if (location.length > 50) {
                this.setState({ error: "Must have a location length of 50 characters or less" });
            } else {
                this.setState(() => ({ location }));
            }
        } else {
            this.setState(() => ({ location }));
        }
    };

    onCapacityChange = (e) => {
        const capacity = e.target.value;
        this.setState(() => ({ capacity }));
    };

    onCostChange = (e) => {
        const cost = e.target.value;
        if (!!cost) {
            if (cost.match(/^\d{1,}(\.\d{0,2})?$/)) {
                this.setState(() => ({ cost }));
            }
        } else {
            this.setState(() => ({ cost }));
        }
    };

    onStartDateChange = (startDate) => {
        this.setState(() => ({
            startDate
        }));
    };

    onEndDateChange = (endDate) => {
        this.setState(() => ({
            endDate
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.location) {
            this.setState(() => ({ error: "Please enter a location/room for your event." }));
        } else if (!this.state.capacity) {
            this.setState(() => ({ error: "Please enter a capacity for your event." }));
        } else if (this.state.endDate <= this.state.startDate) {
            this.setState(() => ({ error: "End datetime must be after start datetime." }));
        } else {
            getCurrentUser()
                .then((res) => {
                    this.setState(() => ({ error: "" }));
                    const payload = {
                        post: this.state.post,
                        user: res.data.username,
                        location: this.state.location,
                        capacity: this.state.capacity,
                        cost: parseFloat(this.state.cost, 10) * 100,
                        planned_start_date: this.state.startDate,
                        planned_end_date: this.state.endDate
                    };
                    this.props.onSubmit(payload);
                })
                .catch((err) => {
                    console.log(JSON.stringify(err, null, 2));
                });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                <div>
                    {!!this.props.eventError && <p className="form__error">Request failed...</p>}
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <p className="form__error">* - Fields required</p>
                </div>
                <div className="input-group">
                    <p className="form__label">Location/Room *:</p>
                    <input
                        readOnly={this.determineReadOnly()}
                        className="text-input"
                        type="text"
                        placeholder="Location"
                        autoFocus
                        value={this.state.location}
                        onChange={this.onLocationChange}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Capacity (Select 0 if undefined) *: </p>
                    <input
                        readOnly={this.determineReadOnly()}
                        className="text-input"
                        type="number"
                        value={this.state.capacity}
                        onChange={this.onCapacityChange}
                        min="0"
                    />
                </div>
                <div className="input-group">
                    <p className="form__label"> Cost ($)*: </p>
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Cost"
                        value={this.state.cost}
                        onChange={this.onCostChange}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Start Date *:</p>
                    <DateTimePicker
                        disabled={this.determineReadOnly()}
                        onChange={this.onStartDateChange}
                        value={this.state.startDate}
                        clearIcon={null}
                        minDate={new Date()}
                    />
                    <div />
                </div>
                <div className="input-group">
                    <p className="form__label">End Date *:</p>
                    <DateTimePicker
                        disabled={this.determineReadOnly()}
                        onChange={this.onEndDateChange}
                        value={this.state.endDate}
                        clearIcon={null}
                        minDate={this.state.startDate}
                        maxDate={addDays(this.state.startDate, 30)}
                    />
                    <div />
                </div>
                <div>
                    <button className="button">{this.props.nextStep}</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    eventError: !!state.events.error && state.events.error.response.data
});

export default connect(mapStateToProps)(EventForm);
