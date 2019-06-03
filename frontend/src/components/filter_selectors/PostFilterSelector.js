import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
    setTextFilter,
    setVisibleFilter,
    sortByName,
    sortByDate,
    sortByVisible,
    setStartDate,
    setEndDate
} from "../../actions/post_filters";

export class PostFilters extends React.Component {
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
        }
    };

    onVisibleChange = (e) => {
        this.props.setVisibleFilter(e.target.value);
    };

    handleCheckbox = (e) => {
        this.props.setVisibleFilter(!this.props.filters.visible);
    };

    render() {
        return (
            <div>
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Search Channels"
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                        />
                    </div>
                    <div className="input-group__item">
                        <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
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
                    <div className="input-group__item">
                        <p>
                            Visible{" "}
                            <span>
                                <input
                                    type="checkbox"
                                    name="prop1"
                                    id="string"
                                    checked={this.props.filters.visible}
                                    onChange={this.handleCheckbox}
                                />
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.postFilters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    setVisibleFilter: (visible) => dispatch(setVisibleFilter(visible)),
    sortByName: () => dispatch(sortByName()),
    sortByDate: () => dispatch(sortByDate()),
    sortByVisible: () => dispatch(sortByVisible()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostFilters);
