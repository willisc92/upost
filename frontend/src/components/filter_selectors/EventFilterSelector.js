import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
    clearDates,
    setStartDate,
    setEndDate,
    setTextFilter,
    setDayFilter,
    setCommunityFilter,
    setHasIncentiveFilter,
    setIncentiveTypeFilter,
    setDietOptionsFilter,
    sortByName,
    sortByDate,
    sortByLastUpdated
} from "../../actions/event_filters";
import { getAllCommunities } from "../../actions/communities";
import { startGetDietOptions } from "../../actions/diet_options";
import { startGetIncentiveTypes } from "../../actions/incentive_types";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

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
        if (e.target.value === "name") {
            this.props.sortByName();
            this.props.clearDates();
        } else if (e.target.value === "date") {
            this.props.sortByDate();
        } else if (e.target.value === "last_updated") {
            this.props.sortByLastUpdated();
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
        if (hasIncentive === "noIncentive" || hasIncentive === "all") {
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
        return (
            <Box display="flex" flexDirection="row" py={2}>
                <Box display="flex" flexDirection="column" paddingRight={1}>
                    <Typography>Search:</Typography>
                    <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                        <Input
                            type="text"
                            className="text-input"
                            placeholder="Search Events"
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                            disableUnderline
                        />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" paddingRight={1}>
                    <Typography>Sort By:</Typography>
                    <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                        <Select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}
                            disableUnderline
                        >
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="date">Creation Date</MenuItem>
                            <MenuItem value="last_updated">Last Updated</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" paddingRight={1}>
                    <Typography>Community:</Typography>
                    <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                        <Select
                            className="select"
                            value={this.props.filters.community}
                            onChange={this.onCommunitiesChange}
                            disableUnderline
                        >
                            <MenuItem value="">Show All</MenuItem>
                            {this.props.communities.map((community) => {
                                return (
                                    <MenuItem key={community} value={community}>
                                        {community}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" paddingRight={1}>
                    <Typography>Occuring:</Typography>
                    <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                        <Select
                            className="select"
                            value={this.props.filters.dayFilter}
                            onChange={this.onDayFilterChange}
                            disableUnderline
                        >
                            <MenuItem value="all">All Days</MenuItem>
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="tomorrow">Tomorrow</MenuItem>
                        </Select>
                    </Box>
                </Box>
                {this.props.filters.dayFilter === "all" && (
                    <Box display="flex" flexDirection="column" paddingRight={1}>
                        <Typography>Date Range:</Typography>
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
                    </Box>
                )}
                {!this.props.foodSpecific && (
                    <Box display="flex" flexDirection="column" paddingRight={1}>
                        <Typography>Perks:</Typography>
                        <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                            <Select
                                className="select"
                                value={this.props.filters.hasIncentive}
                                onChange={this.handleHasIncentiveChange}
                                disableUnderline
                            >
                                <MenuItem value="all">Show All</MenuItem>
                                <MenuItem value="hasIncentive">Has Perks</MenuItem>
                                <MenuItem value="noIncentive">No Perks</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                )}
                {this.props.filters.hasIncentive === "hasIncentive" && !this.props.foodSpecific && (
                    <Box display="flex" flexDirection="column" paddingRight={1}>
                        <Typography>Perk Type:</Typography>
                        <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                            <Select
                                className="select"
                                value={this.props.filters.incentiveType}
                                onChange={this.handleIncentiveTypeChange}
                                disableUnderline
                            >
                                <MenuItem value="">Show All</MenuItem>
                                {this.props.incentiveTypes.map((incentive) => {
                                    return (
                                        <MenuItem key={incentive} value={incentive}>
                                            {incentive}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Box>
                    </Box>
                )}
                {(this.props.filters.incentiveType === "Food" || this.props.foodSpecific) && (
                    <Box display="flex" flexDirection="column" paddingRight={1}>
                        <Typography>Diet Option:</Typography>
                        <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                            <Select
                                className="select"
                                value={this.props.filters.dietOption}
                                onChange={this.handleDietOptionChange}
                                disableUnderline
                            >
                                <MenuItem value="">Show All</MenuItem>
                                {this.props.dietOptions.map((dietOption) => {
                                    return (
                                        <MenuItem key={dietOption} value={dietOption}>
                                            {dietOption}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Box>
                    </Box>
                )}
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.eventFilters,
    communities: state.communities.communities.map((community) => community.community_name),
    incentiveTypes: state.incentiveTypes.incentiveTypes.map((incentiveType) => incentiveType.incentive_name),
    dietOptions: state.dietOptions.dietOptions.map((diet_option) => diet_option.diet_option)
});

const mapDispatchToProps = (dispatch) => ({
    clearDates: () => dispatch(clearDates()),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByName: () => dispatch(sortByName()),
    sortByDate: () => dispatch(sortByDate()),
    sortByLastUpdated: () => dispatch(sortByLastUpdated()),
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
