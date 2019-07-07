import React from "react";
import Modal from "react-modal";
import { RecurringForm } from "../forms/RecurringForm";

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
                    return day.value;
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
                <div className="modal__header">
                    <img className="modal__logo" src={CDNLink + "/dist/images/logo.png"} />
                    <div>
                        <p className="modal__header__label">Save Recurring Event/Incentive Details</p>
                    </div>
                </div>
                <RecurringForm onSubmit={this.onSubmit} id="recurring" lastSelection={this.state} />
                <div className="modal__buttons">
                    <button className="button modal__button" type="submit" form="recurring">
                        Save Details
                    </button>
                    <button className="button modal__button" onClick={this.handleClear}>
                        Clear Details
                    </button>
                </div>
            </Modal>
        );
    }
}
