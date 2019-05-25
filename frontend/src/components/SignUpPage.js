import React from "react";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import API from "../utils/API";

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarFocused: false,
            date: moment(),
            isLoaded: true,
            channels: undefined
        };
    }

    componentDidMount() {
        API.get("channels/").then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    channels: result.data
                });
                console.log(result.data);
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    onDateChange = (date) => {
        if (date) {
            this.setState(() => ({ date }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    render() {
        return (
            <form>
                <p>Username*</p>
                <input type="text" />
                <p>150 characters of fewer. Letters, digits and @/./+/-/) only.</p>
                <p>Email Address</p>
                <input type="text" />
                <p>First Name*</p>
                <input type="text" />
                <p>Last Name*</p>
                <input type="text" />
                <p>Birth date</p>
                <SingleDatePicker
                    date={this.state.date}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={(day) => false}
                />
                <p>Country*</p>
                <input type="text" />
                <p>State*</p>
                <input type="text" />
                <p>Steet Name*</p>
                <input type="text" />
                <p>Postal Code*</p>
                <input type="text" />
                <p>City*</p>
                <input type="text" />
                <p>Sex</p>
                <select>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <p>Phone Number</p>
                <input type="text" />
                <p>Interests*</p>
            </form>
        );
    }
}

export default SignUpPage;
