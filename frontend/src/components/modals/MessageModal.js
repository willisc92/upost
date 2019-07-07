import React from "react";
import Modal from "react-modal";

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
                    <div>
                        <p className="modal__header__label">{this.props.message}</p>
                    </div>
                </div>
                <div className="modal__buttons">
                    <button className="button modal__button" type="button" onClick={this.props.closeMessageModal}>
                        Ok
                    </button>
                </div>
            </Modal>
        );
    }
}

export default MessageModal;
