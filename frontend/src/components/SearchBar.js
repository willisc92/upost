import React from "react";
import MessageModal from "./modals/MessageModal";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            message_rendered: false,
            message: ""
        };
    }

    onTextChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            text
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === "") {
            this.setState(() => ({
                message_rendered: true,
                message: "Please enter a search parameter"
            }));
        } else {
            this.props.history.push(`/searchResults/${this.state.text}`);
        }
    };

    closeMessageModal = () => {
        this.setState(() => ({
            message_rendered: false
        }));
    };

    render() {
        return (
            <div>
                <MessageModal
                    message={this.state.message}
                    closeMessageModal={this.closeMessageModal}
                    isOpen={this.state.message_rendered}
                />
                <form className="searchbar" onSubmit={this.onSubmit}>
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Search"
                        value={this.state.text}
                        onChange={this.onTextChange}
                    />
                    <button className="button">
                        <i className="material-icons">search</i>
                    </button>
                </form>
            </div>
        );
    }
}
