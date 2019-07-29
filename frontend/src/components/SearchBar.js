import React from "react";
import MessageModal from "./modals/MessageModal";
import { Box, IconButton, Input } from "@material-ui/core";

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
            <React.Fragment>
                <MessageModal
                    message={this.state.message}
                    closeMessageModal={this.closeMessageModal}
                    isOpen={this.state.message_rendered}
                />
                <Box bgcolor="white" pl={2} boxShadow={3}>
                    <form onSubmit={this.onSubmit}>
                        <Input
                            type="search"
                            placeholder="Search"
                            disableUnderline
                            value={this.state.text}
                            onChange={this.onTextChange}
                            style={{ width: 500 }}
                        />
                        <IconButton color="primary" type="submit">
                            <i className="material-icons">search</i>
                        </IconButton>
                    </form>
                </Box>
            </React.Fragment>
        );
    }
}
