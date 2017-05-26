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
import {
    requestBoardCreation
}
from '../actions/boardsActions';
import serialize from 'form-serialize';
import {
    connect
}
from 'react-redux';

const inputFields = [{
    type: "text",
    name: "boardName",
    label: "Name"
}];


class NewBoardForm extends React.Component {
    constructor(props) {
        super(props);
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
            requestBoardCreation
        } = this.props;
        return (
            <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add new board</ModalHeader>
          <ModalBody>
            <FormWrapper onSubmit={requestBoardCreation} id="new-board" inputFields={inputFields} onClick={this.toggle}/>
          </ModalBody>
        </Modal>
      </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        requestBoardCreation: (e) => {
            e.preventDefault();
            const form = serialize(e.target, {
                hash: true
            });
            console.log("form submitted", form);

            dispatch(requestBoardCreation(form));
        }
    };
}

export default connect(null, mapDispatchToProps)(NewBoardForm);
