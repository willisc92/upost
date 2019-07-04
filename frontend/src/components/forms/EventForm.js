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
            event_title: this.props.event ? this.props.event.event_title : "",
            location: !!this.props.event ? this.props.event.location : "",
            capacity: !!this.props.event ? this.props.event.capacity : 0,
            cost: this.props.event ? (this.props.event.cost / 100).toString() : "0",
            event_description: this.props.event
                ? this.props.event.event_description
                : !!this.props.description
                ? this.props.description
                : "",
            error: "",
            startDate: !!this.props.event ? new Date(this.props.event.planned_start_date) : new Date(),
            endDate: !!this.props.event
                ? new Date(this.props.event.planned_end_date)
                : new Date(new Date().setHours(new Date().getHours() + 1))
        };
    }

    onTitleChange = (e) => {
        const event_title = e.target.value;
        if (!!event_title) {
            if (event_title.length > 50) {
                this.setState({ error: "Must have an event name 50 characters or less" });
            } else {
                this.setState(() => ({ event_title }));
            }
        } else {
            this.setState(() => ({ event_title }));
        }
    };

    onDescriptionChange = (e) => {
        const event_description = e.target.value;
        if (!!event_description) {
            if (event_description.length > 500) {
                this.setState({ error: "Event description must be 500 characters or less" });
            } else {
                this.setState(() => ({ event_description }));
            }
        } else {
            this.setState(() => ({ event_description }));
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
        } else if (this.state.endDate <= this.state.startDate) {
            this.setState(() => ({ error: "End datetime must be after start datetime." }));
        } else if (!this.state.event_description) {
            this.setState(() => ({ error: "Event description must be provided." }));
        } else if (!this.state.event_title) {
            this.setState(() => ({ error: "Event title must be provided." }));
        } else {
            getCurrentUser()
                .then((res) => {
                    this.setState(() => ({ error: "" }));
                    const payload = {
                        post: this.state.post,
                        event_title: this.state.event_title,
                        event_description: this.state.event_description,
                        user: res.data.username,
                        location: this.state.location,
                        capacity: this.state.capacity,
                        cost: parseFloat(this.state.cost, 10) * 100,
                        planned_start_date: this.state.startDate,
                        planned_end_date: this.state.endDate,
                        event_description: this.state.event_description
                    };
                    this.props.onSubmit(payload);
                    console.log(payload);
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
                    <p className="form__label">Event Title*: </p>
                    <textarea
                        className="textarea"
                        type="text"
                        placeholder="Title"
                        value={this.state.event_title}
                        onChange={this.onTitleChange}
                        disabled={this.props.read_only}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Description*: </p>
                    <textarea
                        className="textarea"
                        type="text"
                        placeholder="Description"
                        value={this.state.event_description}
                        onChange={this.onDescriptionChange}
                        disabled={this.props.read_only}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Location/Room *:</p>
                    <input
                        readOnly={this.props.read_only}
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
                        readOnly={this.props.read_only}
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
                        disabled={this.props.read_only}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Start Date *:</p>
                    <DateTimePicker
                        disabled={this.props.read_only}
                        onChange={this.onStartDateChange}
                        value={this.state.startDate}
                        clearIcon={null}
                    />
                    <div />
                </div>
                <div className="input-group">
                    <p className="form__label">End Date *:</p>
                    <DateTimePicker
                        disabled={this.props.read_only}
                        onChange={this.onEndDateChange}
                        value={this.state.endDate}
                        clearIcon={null}
                    />
                    <div />
                </div>
                <div>{!this.props.read_only && <button className="button">{this.props.nextStep}</button>}</div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    eventError: !!state.events.error && state.events.error.response.data
});

export default connect(mapStateToProps)(EventForm);
