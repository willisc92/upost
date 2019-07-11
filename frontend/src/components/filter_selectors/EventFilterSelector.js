import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { sortAscending, sortDescending, setStartDate, setEndDate, setTextFilter } from "../../actions/event_filters";

export class EventFilters extends React.Component {
    state = {
        calenderFocused: null
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    };

    onSortChange = (e) => {
        if (e.target.value === "ascending") {
            this.props.sortAscending();
        } else if (e.target.value === "descending") {
            this.props.sortDescending();
        }
    };

    render() {
        return (
            <div>
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Search Events"
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                        />
                    </div>
                    <div className="input-group__item">
                        Sort by:{" "}
                        <select
                            className="select"
                            defaultValue={this.props.filters.sortBy}
                            onChange={this.onSortChange}
                        >
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        Date Range:{" "}
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
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.eventFilters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortAscending: () => dispatch(sortAscending()),
    sortDescending: () => dispatch(sortDescending()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilters);
