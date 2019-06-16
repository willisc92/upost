import React from "react";
import { connect } from "react-redux";
import { getAllCommunities } from "../../actions/communities";
import DateTimePicker from "react-datetime-picker";
export class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: !!this.props.event ? this.props.event.location : "",
            community: !!this.props.event ? this.props.event.community : null,
            capacity: !!this.props.event ? this.props.event.capacity : 0,
            error: "",
            startDate: !!this.props.event ? new Date(this.props.event.planned_start_date) : new Date(),
            endDate: !!this.props.event
                ? new Date(this.props.event.planned_end_date)
                : new Date(new Date().setHours(new Date().getHours() + 1))
        };
    }

    componentWillMount() {
        this.props
            .getAllCommunities()
            .then(() => {})
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
    }

    onCommunitySelectChange = (e) => {
        e.persist();
        this.setState(() => ({
            community: e.target.value
        }));
    };

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
        if (!!capacity) {
            this.setState(() => ({ capacity }));
        }
    };

    onStartDateChange = (startDate) => {
        this.setState(() => {
            startDate;
        });
    };

    onEndDateChange = (endDate) => {
        this.setState(() => {
            endDate;
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.community) {
            this.setState(() => ({ error: "Please select a commmunity from the dropdown menu." }));
        } else if (!this.state.location) {
            this.setState(() => ({ error: "Please enter a location/room for your event." }));
        } else if (!this.state.capacity) {
            this.setState(() => ({ error: "Please enter a capacity for your event." }));
        } else if (this.state.endDate <= this.state.startDate) {
            this.setState(() => ({ error: "End datetime must be after start datetime." }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.onSubmit({
                user: localStorage.getItem("user_id"),
                location: this.state.location,
                community: this.state.community,
                capacity: this.state.capacity,
                planned_start_date: this.state.startDate,
                planned_end_date: this.state.endDate
            });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.eventError && <p className="form__error">Request failed...</p>}
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <div className="input-group">
                    <p className="form__label">Community: </p>
                    <select
                        disabled={this.determineReadOnly()}
                        onChange={this.onCommunitySelectChange}
                        defaultValue={this.props.event ? this.props.event.community : ""}
                    >
                        <option key="empty" value="" />
                        {this.props.communities.map((community) => {
                            return (
                                <option key={community.community_name} value={community.community_name}>
                                    {community.community_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="input-group">
                    <p className="form__label">Location/Room:</p>
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
                    <p className="form__label">Capacity (Select 0 if undefined): </p>
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
                    <p className="form__label">Start Date:</p>
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
                    <p className="form__label">End Date:</p>
                    <DateTimePicker
                        disabled={this.determineReadOnly()}
                        onChange={this.onEndDateChange}
                        value={this.state.endDate}
                        clearIcon={null}
                        minDate={this.state.startDate}
                    />
                    <div />
                </div>
                <div>
                    <button className="button">Submit Event</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    eventError: !!state.events.error && state.events.error.response.data,
    communities: !!state.communities && state.communities.communities
});

const mapDispatchToProps = (dispatch) => ({
    getAllCommunities: () => dispatch(getAllCommunities())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventForm);
