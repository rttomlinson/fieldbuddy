import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
}
from 'reactstrap';
import FormWrapper from './elements/FormWrapper';

const inputFields = [{
    type: "text",
    name: "boardName",
    label: "Name"
}];


class NewBoardForm extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const {
            onSubmit
        } = this.props;
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Add new board</ModalHeader>
                  <ModalBody>
                    <FormWrapper onSubmit={onSubmit} id="new-board" inputFields={inputFields} onClick={this.toggle}/>
                  </ModalBody>
                </Modal>
            </div>
        );
    }
}



export default NewBoardForm;
