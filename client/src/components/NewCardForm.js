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
    requestCardCreation
}
from '../actions/boardsActions';
import serialize from 'form-serialize';
import {
    connect
}
from 'react-redux';

const createInputFields = (listId) => {
    return [
        {
            type: "text",
            name: "cardName",
            label: "Name"
        },
        {
            type: "text",
            name: "cardDescription",
            label: "Describe it a little"
        },
        {
            type: "hidden",
            name: "listId",
            value: listId
        }
    ];
};

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
            requestCardCreation,
            listId,
            buttonLabel
        } = this.props;
        return (
            <div>
        <Button color="danger" onClick={this.toggle}>{buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add new card</ModalHeader>
          <ModalBody>
            <FormWrapper buttonText={"Add card"} onSubmit={requestCardCreation} id="new-card" inputFields={createInputFields(listId)} onClick={this.toggle}/>
          </ModalBody>
        </Modal>
      </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        requestCardCreation: (e) => {
            e.preventDefault();
            const form = serialize(e.target, {
                hash: true
            });
            console.log("new card form submitted", form);

            dispatch(requestCardCreation(form));
        }
    };
}
export default connect(null, mapDispatchToProps)(NewBoardForm);
