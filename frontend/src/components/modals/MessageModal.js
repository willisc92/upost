import React from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class MessageModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        Modal.setAppElement("body");
    }

    render() {
        return (
            <Modal className="modal" isOpen={this.props.isOpen} contentLabel="Message" closeTimeoutMS={200}>
                <div className="modal__header">
                    <img className="modal__logo" src={CDNLink + "/dist/images/logo.png"} />
                    <Typography variant="h5">{this.props.message}</Typography>
                </div>
                <div className="modal__buttons">
                    <Button variant="contained" color="primary" onClick={this.props.closeMessageModal}>
                        Ok
                    </Button>
                </div>
            </Modal>
        );
    }
}

export default MessageModal;
