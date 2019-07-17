import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
    setDefault,
    clearDates,
    sortAscending,
    sortDescending,
    setStartDate,
    setEndDate,
    setTextFilter,
    setDayFilter,
    setCommunityFilter,
    setHasIncentiveFilter,
    setIncentiveTypeFilter,
    setDietOptionsFilter
} from "../../actions/event_filters";
import { getAllCommunities } from "../../actions/communities";
import { startGetDietOptions } from "../../actions/diet_options";
import { startGetIncentiveTypes } from "../../actions/incentive_types";

export class EventFilters extends React.Component {
    state = {
        calenderFocused: null
    };

    componentDidMount() {
        let promises = [];

        promises.push(this.props.getAllCommunities());
        promises.push(this.props.startGetDietOptions());
        promises.push(this.props.startGetIncentiveTypes());

        Promise.all(promises)
            .then(() => {})
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

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

    onDayFilterChange = (e) => {
        const dayFilter = e.target.value;
        this.props.setDayFilter(dayFilter);
        if (dayFilter !== "all") {
            this.props.clearDates();
        }
    };

    onCommunitiesChange = (e) => {
        this.props.setCommunityFilter(e.target.value);
    };

    handleHasIncentiveChange = (e) => {
        const hasIncentive = e.target.value;
        this.props.setHasIncentiveFilter(hasIncentive);
        if (hasIncentive === "noIncentive") {
            this.props.setIncentiveTypeFilter("");
            this.props.setDietOptionsFilter("");
        }
    };

    handleIncentiveTypeChange = (e) => {
        this.props.setIncentiveTypeFilter(e.target.value);
    };

    handleDietOptionChange = (e) => {
        this.props.setDietOptionsFilter(e.target.value);
    };

    render() {
        const foodSpecific = this.props.foodSpecific;

        return (
            <div>
                <div className="input-group">
                    <div className="input-group__column">
                        Search:{" "}
                        <div className="input-group__item">
                            <input
                                type="text"
                                className="text-input"
                                placeholder="Search Events"
                                value={this.props.filters.text}
                                onChange={this.onTextChange}
                            />
                        </div>
                    </div>
                    <div className="input-group__column">
                        Sort Dates:{" "}
                        <div className="input-group__item">
                            <select
                                className="select"
                                defaultValue={this.props.filters.sortBy}
                                onChange={this.onSortChange}
                            >
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group__column">
                        Filter Community:{" "}
                        <div className="input-group__item">
                            <select
                                className="select"
                                defaultValue={this.props.filters.community}
                                onChange={this.onCommunitiesChange}
                            >
                                <option value="">Show All</option>
                                {this.props.communities.map((community) => {
                                    return (
                                        <option key={community} value={community}>
                                            {community}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="input-group__column">
                        Occuring:{" "}
                        <div className="input-group__item">
                            <select
                                className="select"
                                defaultValue={this.props.filters.dayFilter}
                                onChange={this.onDayFilterChange}
                            >
                                <option value="all">All Days</option>
                                <option value="today">Today</option>
                                <option value="tomorrow">Tomorrow</option>
                            </select>
                        </div>
                    </div>
                    {this.props.filters.dayFilter === "all" && (
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
                    {!this.props.foodSpecific && (
                        <div className="input-group__column">
                            Incentive:
                            <div className="input-group__item">
                                <select
                                    className="select"
                                    defaultValue={this.props.filters.hasIncentive}
                                    onChange={this.handleHasIncentiveChange}
                                >
                                    <option value="all">Show All</option>
                                    <option value="hasIncentive">Has Incentive</option>
                                    <option value="noIncentive">No Incentive</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {this.props.filters.hasIncentive !== "noIncentive" && !this.props.foodSpecific && (
                        <div className="input-group__column">
                            Incentive Type:
                            <div className="input-group__item">
                                <select
                                    className="select"
                                    defaultValue={this.props.filters.incentiveType}
                                    onChange={this.handleIncentiveTypeChange}
                                >
                                    <option value="">Show All</option>
                                    {this.props.incentiveTypes.map((incentive) => {
                                        return (
                                            <option key={incentive} value={incentive}>
                                                {incentive}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    )}
                    {this.props.filters.incentiveType === "Food" ||
                        (this.props.foodSpecific && (
                            <div className="input-group__column">
                                Diet Option:
                                <div className="input-group__item">
                                    <select
                                        className="select"
                                        defaultValue={this.props.filters.dietOption}
                                        onChange={this.handleDietOptionChange}
                                    >
                                        <option value="">Show All</option>
                                        {this.props.dietOptions.map((dietOption) => {
                                            return (
                                                <option key={dietOption} value={dietOption}>
                                                    {dietOption}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.eventFilters,
    communities: state.userCommunities.communities.map((community) => community.community_name),
    incentiveTypes: state.incentiveTypes.incentiveTypes.map((incentiveType) => incentiveType.incentive_name),
    dietOptions: state.dietOptions.dietOptions.map((diet_option) => diet_option.diet_option)
});

const mapDispatchToProps = (dispatch) => ({
    setDefault: () => dispatch(setDefault()),
    clearDates: () => dispatch(clearDates()),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortAscending: () => dispatch(sortAscending()),
    sortDescending: () => dispatch(sortDescending()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setDayFilter: (dayFilter) => dispatch(setDayFilter(dayFilter)),
    setCommunityFilter: (communities) => dispatch(setCommunityFilter(communities)),
    setHasIncentiveFilter: (hasIncentive) => dispatch(setHasIncentiveFilter(hasIncentive)),
    setIncentiveTypeFilter: (incentiveTypes) => dispatch(setIncentiveTypeFilter(incentiveTypes)),
    setDietOptionsFilter: (dietOptions) => dispatch(setDietOptionsFilter(dietOptions)),
    getAllCommunities: () => dispatch(getAllCommunities()),
    startGetDietOptions: () => dispatch(startGetDietOptions()),
    startGetIncentiveTypes: () => dispatch(startGetIncentiveTypes())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilters);
