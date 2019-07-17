import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { setTypeFilter, sortByDate, sortByType, setStartDate, setEndDate } from "../../actions/incentive_filters";
import { startGetIncentiveTypes } from "../../actions/incentive_types";

export class IncentiveFilters extends React.Component {
    state = {
        calenderFocused: null
    };

    componentDidMount() {
        this.props
            .startGetIncentiveTypes()
            .then(() => {})
            .catch((err) => console.log(JSON.stringify(err, null, 2)));
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    };

    onSortChange = (e) => {
        if (e.target.value === "type") {
            this.props.sortByType();
        } else if (e.target.value === "date") {
            this.props.sortByDate();
        }
    };

    onIncentiveTypeChange = (e) => {
        this.props.setTypeFilter(e.target.value);
    };

    render() {
        return (
            <div>
                <div className="input-group">
                    <div className="input-group__item">
                        Sort by:{" "}
                        <select
                            className="select"
                            defaultValue={this.props.filters.sortBy}
                            onChange={this.onSortChange}
                        >
                            <option value="type">Type</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        Type:{" "}
                        <select
                            className="select"
                            onChange={this.onIncentiveTypeChange}
                            defaultValue={this.props.filters && this.props.filters.type}
                        >
                            <option key="empty" value="" />
                            {this.props.incentiveTypes.map((incentiveType) => {
                                return (
                                    <option key={incentiveType.incentive_name} value={incentiveType.incentive_name}>
                                        {incentiveType.incentive_name}
                                    </option>
                                );
                            })}
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
    filters: state.incentiveFilters,
    incentiveTypes: !!state.incentiveTypes && state.incentiveTypes.incentiveTypes
});

const mapDispatchToProps = (dispatch) => ({
    startGetIncentiveTypes: () => dispatch(startGetIncentiveTypes()),
    setTypeFilter: (type) => dispatch(setTypeFilter(type)),
    sortByDate: () => dispatch(sortByDate()),
    sortByType: () => dispatch(sortByType()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IncentiveFilters);
