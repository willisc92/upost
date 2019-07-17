import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
    setTextFilter,
    sortByName,
    sortByDate,
    setStartDate,
    setEndDate,
    sortByLastUpdated
} from "../../actions/channel_filters";

export class ChannelFilters extends React.Component {
    state = {
        calenderFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        if (e.target.value === "date") {
            this.props.sortByDate();
        } else if (e.target.value === "name") {
            this.props.sortByName();
            this.props.setStartDate();
            this.props.setEndDate();
        } else if (e.target.value === "last_updated") {
            this.props.sortByLastUpdated();
        }
    };

    render() {
        return (
            <div>
                <div className="input-group">
                    <div className="input-group__column">
                        Search:
                        <div className="input-group__item">
                            <input
                                type="text"
                                className="text-input"
                                placeholder="Search Channels"
                                value={this.props.filters.text}
                                onChange={this.onTextChange}
                            />
                        </div>
                    </div>
                    <div className="input-group__column">
                        Sort by:{" "}
                        <div className="input-group__item">
                            <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
                                <option value="date">Creation Date</option>
                                <option value="last_updated">Last Updated</option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                    </div>
                    {this.props.filters.sortBy !== "name" && (
                        <div className="input-group__column">
                            Date Range:{" "}
                            <div className="input-group__item">
                                <DateRangePicker
                                    startDate={this.props.filters.startDate}
                                    endDate={this.props.filters.endDate}
                                    onDatesChange={this.onDatesChange}
                                    focusedInput={this.state.calenderFocused}
                                    onFocusChange={this.onFocusChange}
                                    showClearDates={true}
                                    numberOfMonths={1}
                                    isOutsideRange={() => false}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.channelFilters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByName: () => dispatch(sortByName()),
    sortByDate: () => dispatch(sortByDate()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByLastUpdated: () => dispatch(sortByLastUpdated())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelFilters);
