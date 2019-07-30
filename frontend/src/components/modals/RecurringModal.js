import React from "react";
import Modal from "react-modal";
import { RecurringForm } from "../forms/RecurringForm";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export class RecurringModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recurringFrequency: "none",
            endSelection: "none",
            numOccurences: 0,
            endDate: null,
            byweekday: [
                { id: 0, value: "0", label: "Monday", isChecked: false },
                { id: 1, value: "1", label: "Tuesday", isChecked: false },
                { id: 2, value: "2", label: "Wednesday", isChecked: false },
                { id: 3, value: "3", label: "Thursday", isChecked: false },
                { id: 4, value: "4", label: "Friday", isChecked: false },
                { id: 5, value: "5", label: "Saturday", isChecked: false },
                { id: 6, value: "6", label: "Sunday", isChecked: false }
            ]
        };
    }

    componentWillMount() {
        Modal.setAppElement("body");
    }

    onSubmit = async (payload) => {
        await this.setState(() => ({
            recurringFrequency: payload.recurringFrequency,
            endSelection: payload.endSelection,
            numOccurences: payload.numOccurences,
            endDate: payload.endDate,
            byweekday: payload.byweekday
        }));

        const formatted_payload = {
            recurringFrequency: this.state.recurringFrequency,
            endSelection: this.state.endSelection,
            numOccurences: this.state.numOccurences,
            endDate: this.state.endDate,
            byweekday: this.state.byweekday
                .filter((day) => {
                    return day.isChecked;
                })
                .map((day) => {
                    return day.id;
                })
        };

        this.props.onSubmit(formatted_payload);
    };

    handleClear = async () => {
        await this.setState(() => ({
            recurringFrequency: "none",
            endSelection: "none",
            numOccurences: 0,
            endDate: null,
            byweekday: [
                { id: 0, value: "0", label: "Monday", isChecked: false },
                { id: 1, value: "1", label: "Tuesday", isChecked: false },
                { id: 2, value: "2", label: "Wednesday", isChecked: false },
                { id: 3, value: "3", label: "Thursday", isChecked: false },
                { id: 4, value: "4", label: "Friday", isChecked: false },
                { id: 5, value: "5", label: "Saturday", isChecked: false },
                { id: 6, value: "6", label: "Sunday", isChecked: false }
            ]
        }));

        this.onSubmit(this.state);
    };

    mapEndSelectionToValue = () => {
        switch (this.state.endSelection) {
            case "numOccurence":
                return parseInt(this.state.numOccurences, 10);
            case "onDate":
                return this.state.endDate;
            default:
                return null;
        }
    };

    render() {
        return (
            <Modal className="modal" isOpen={this.props.isOpen} contentLabel="Recurring" closeTimeoutMS={200}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <img className="modal__logo" src={CDNLink + "/dist/images/logo.png"} />
                    <Typography variant="h6">Save Recurring Event/Incentive Details</Typography>
                </Box>
                <RecurringForm onSubmit={this.onSubmit} id="recurring" lastSelection={this.state} />
                <Box display="flex" justifyContent="center">
                    <Box paddingRight={1}>
                        <Button variant="contained" color="primary" type="submit" form="recurring">
                            Save Details
                        </Button>
                    </Box>
                    <Button variant="contained" color="primary" onClick={this.handleClear}>
                        Clear Details
                    </Button>
                </Box>
            </Modal>
        );
    }
}
