import React from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/auth";
import moment from "moment";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

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
            startDate: !!this.props.event ? moment(this.props.event.planned_start_date) : moment().add(1, "hours"),
            endDate: !!this.props.event ? moment(this.props.event.planned_end_date) : moment().add(2, "hours"),
            endDateChanged: false,
            capacity_status: !!this.props.event ? this.props.event.capacity_status : 0
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
        if (capacity < this.state.capacity_status) {
            this.setState(() => ({
                error:
                    "Capacity cannot be decreased past the current number of registered attendees. Please cancel the event to downsize."
            }));
        } else {
            this.setState(() => ({ capacity }));
        }
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
        if (this.state.endDateChanged) {
            this.setState(() => ({
                startDate
            }));
        } else {
            this.setState(() => ({
                startDate,
                endDate: moment(startDate).add(1, "hours")
            }));
        }
    };

    onEndDateChange = (endDate) => {
        this.setState(() => ({
            endDate,
            endDateChanged: true
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.location) {
            this.setState(() => ({ error: "Please enter a location/room for your event." }));
        } else if (!!this.state.endDate && !!this.state.startDate && this.state.endDate <= this.state.startDate) {
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
                        planned_start_date: this.state.startDate.toDate(),
                        planned_end_date: this.state.endDate.toDate(),
                        event_description: this.state.event_description
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
                <Box py={2}>
                    {!!this.props.eventError && (
                        <Typography variant="h2" color="error" gutterBottom>
                            Request failed...
                        </Typography>
                    )}
                    {this.state.error && (
                        <Typography variant="h2" color="error" gutterBottom>
                            {this.state.error}
                        </Typography>
                    )}
                </Box>

                <Box>
                    <TextField
                        required
                        label="Event Title"
                        placeholder="Title"
                        autoFocus
                        value={this.state.event_title}
                        onChange={this.onTitleChange}
                        disabled={this.props.read_only}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Event Description"
                        placeholder="Describe your event for the reader"
                        value={this.state.event_description}
                        onChange={this.onDescriptionChange}
                        disabled={this.props.read_only}
                        multiline
                    />
                </Box>
                <Box>
                    <TextField
                        readOnly={this.props.read_only}
                        label="Location/Room"
                        placeholder="Location"
                        value={this.state.location}
                        onChange={this.onLocationChange}
                    />
                </Box>
                <Box display="flex">
                    <Box paddingRight={2}>
                        <TextField
                            readOnly={this.props.read_only}
                            label="Capacity (Select 0 if not defined)"
                            type="number"
                            value={this.state.capacity}
                            onChange={this.onCapacityChange}
                            min="0"
                        />
                    </Box>
                    {this.props.showAttendees && (
                        <Typography>{`Currently there are ${
                            this.state.capacity_status
                        } attendee(s) registered for this event`}</Typography>
                    )}
                </Box>
                <Box>
                    <TextField
                        label="Cost ($)"
                        type="text"
                        placeholder="Cost"
                        value={this.state.cost}
                        onChange={this.onCostChange}
                        disabled={this.props.read_only}
                    />
                </Box>
                <Box width={250}>
                    <KeyboardDateTimePicker
                        label="Start Date (YYYY/MM/DD HH:MM)"
                        value={this.state.startDate}
                        onChange={this.onStartDateChange}
                        disabled={this.props.read_only}
                        required
                        format="YYYY/MM/DD hh:mm a"
                        fullWidth={true}
                        minDate={moment()}
                        maxDate={moment().add(5, "years")}
                        minDateMessage="Date should not be in the past"
                    />
                </Box>
                <Box width={250}>
                    <KeyboardDateTimePicker
                        label="End Date (YYYY/MM/DD HH:MM)"
                        value={this.state.endDate}
                        onChange={this.onEndDateChange}
                        disabled={this.props.read_only}
                        required
                        format="YYYY/MM/DD hh:mm a"
                        fullWidth={true}
                        minDate={moment()}
                        maxDate={moment().add(5, "years")}
                        minDateMessage="Date should not be in the past"
                    />
                </Box>
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
    eventError: !!state.events.error && state.events.error.response.data
});

export default connect(mapStateToProps)(EventForm);
