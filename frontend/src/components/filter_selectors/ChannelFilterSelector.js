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
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

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
            <Box display="flex" flexDirection="row" py={2}>
                <Box display="flex" flexDirection="column" paddingRight={1}>
                    <Typography>Search:</Typography>
                    <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                        <Input
                            type="text"
                            className="text-input"
                            placeholder="Search Channels"
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                            style={{ width: 250 }}
                            disableUnderline
                        />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" paddingRight={1}>
                    <Typography>Sort By:</Typography>
                    <Box bgcolor="white" border={0.1} borderColor="#cacccd">
                        <Select
                            autoWidth
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}
                            variant="outlined"
                            disableUnderline
                        >
                            <MenuItem value="date">Creation Date</MenuItem>
                            <MenuItem value="last_updated">Last Updated</MenuItem>
                            <MenuItem value="name">Name</MenuItem>
                        </Select>
                    </Box>
                </Box>
                {this.props.filters.sortBy !== "name" && (
                    <Box display="flex" flexDirection="column" fontFamily="fontFamily">
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
