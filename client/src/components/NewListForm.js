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
    requestListCreation
}
from '../actions/boardsActions';
import serialize from 'form-serialize';
import {
    connect
}
from 'react-redux';

const createInputFields = (boardId) => {
    return [
        {
            type: "text",
            name: "listName",
            label: "Name"
        },
        {
            type: "hidden",
            name: "boardId",
            value: boardId
        }
    ];
};



class NewListForm extends React.Component {
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
            requestListCreation,
            boardId,
            buttonLabel
        } = this.props;
        return (
            <div>
        <Button color="danger" onClick={this.toggle}>{buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add new list</ModalHeader>
          <ModalBody>
            <FormWrapper buttonText={"Add list"} onSubmit={requestListCreation} id="new-list" inputFields={createInputFields(boardId)} onClick={this.toggle}/>
          </ModalBody>
        </Modal>
      </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        requestListCreation: (e) => {
            e.preventDefault();
            const form = serialize(e.target, {
                hash: true
            });
            console.log("form submitted", form);

            dispatch(requestListCreation(form));
        }
    };
}

export default connect(null, mapDispatchToProps)(NewListForm);
