import { RecurringModal } from "../modals/RecurringModal";
import React from "react";

export class RecurringTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleModal = () => {
        this.setState(() => ({
            isOpen: true
        }));
    };

    onSubmit = async (payload) => {
        await this.setState({
            rrule: payload,
            isOpen: false
        });

        console.log(this.state.rrule);
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Modal Test</h1>
                    </div>
                </div>

                <div className="content-container">
                    <button className="button" onClick={this.toggleModal}>
                        Toggle Modal
                    </button>
                    <RecurringModal isOpen={this.state.isOpen} onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}
