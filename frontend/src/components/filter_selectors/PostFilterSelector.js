import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
    setTextFilter,
    sortByName,
    sortByDate,
    setStartDate,
    setEndDate,
    sortByLastUpdated,
    setCommunityFilter
} from "../../actions/post_filters";
import { getAllCommunities } from "../../actions/communities";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

export class PostFilters extends React.Component {
    state = {
        calenderFocused: null
    };

    componentDidMount() {
        this.props
            .getAllCommunities()
            .then(() => {})
            .catch((err) => console.log(err));
    }

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

    onCommunitiesChange = (e) => {
        this.props.setCommunityFilter(e.target.value);
    };

    render() {
        const communities =
            !!this.props.communities && this.props.communities !== []
                ? this.props.communities.map((community) => !!community.community_name && community.community_name)
                : [];

        return (
            !!this.props.filters &&
            !!communities && (
                <Box display="flex" flexDirection="row" py={2}>
                    <Box display="flex" flexDirection="column" paddingRight={1}>
                        <Typography>Search:</Typography>
                        <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                            <Input
                                className="text-input"
                                type="text"
                                placeholder="Search Posts"
                                value={this.props.filters.text}
                                onChange={this.onTextChange}
                                style={{ width: 250 }}
                                disableUnderline
                            />
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="column" paddingRight={1}>
                        <Typography>Community:</Typography>
                        <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                            <Select
                                value={this.props.filters.community}
                                onChange={this.onCommunitiesChange}
                                className="select"
                                disableUnderline
                            >
                                <MenuItem value="">Show All</MenuItem>
                                {communities.map((community) => {
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
                        <Typography>Sort By:</Typography>
                        <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                            <Select
                                className="select"
                                value={this.props.filters.sortBy}
                                onChange={this.onSortChange}
                                disableUnderline
                            >
                                <MenuItem value="date">Creation Date</MenuItem>
                                <MenuItem value="last_updated">Last Updated</MenuItem>
                                <MenuItem value="name">Name</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    {this.props.filters.sortBy !== "name" && (
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
                </Box>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.postFilters,
    communities: state.communities.communities
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByName: () => dispatch(sortByName()),
    sortByDate: () => dispatch(sortByDate()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByLastUpdated: () => dispatch(sortByLastUpdated()),
    setCommunityFilter: (community) => dispatch(setCommunityFilter(community)),
    getAllCommunities: () => dispatch(getAllCommunities())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostFilters);
