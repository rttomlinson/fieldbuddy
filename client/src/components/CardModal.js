/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
}
from 'reactstrap';
import {
    Form,
    FormGroup,
    Label,
    Input
}
from 'reactstrap';
import {
    connect
}
from 'react-redux';
import serialize from 'form-serialize';
import {
    requestCardUpdate
}
from '../actions/boardsActions';


const CardModalBody = ({
    description,
    toggleEditDescription
}) => {
    return (
        <ModalBody>
            {description}{" "}<a href="/" onClick={(e) => {
                e.preventDefault();
                toggleEditDescription();
            }}>Click here to edit the description</a>
          </ModalBody>
    );
};

const CardModalEditBody = ({
    description,
    toggleEditDescription,
    onChange,
    restoreOriginalDescriptionAndCloseEditMode,
    requestCardUpdate
}) => {
    return (
        <ModalBody>
            <Form id="description-update" onSubmit={(e) => {
                e.preventDefault();
                let form = serialize(e.target, {hash:true});
                requestCardUpdate(form);
                console.log("Sending request to server to change description. Request a card update");
            }}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="textarea" name="description" id="description" value={description} onChange={onChange}/>
                </FormGroup>
                <Button form="description-update" type="submit">Save changes</Button>
                <Button onClick={toggleEditDescription}>Preview</Button>
                <Button onClick={restoreOriginalDescriptionAndCloseEditMode}>Cancel</Button>
            </Form>
        </ModalBody>

    );
};

class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            editDescription: false,
            scopedDescription: this.props.description
        };

        this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.description !== this.props.description) {
            console.log("This description prop is different from the old one!");
            this.setState({
                scopedDescription: nextProps.description,
                editDescription: false
            });
        }
    }


    toggle() {

        if (this.state.modal === true && this.state.editDescription === true) {
            //close editDescription mode
            this.setState({
                modal: !this.state.modal,
                editDescription: false,
                scopedDescription: this.props.description
            });
        }
        else if (this.state.modal === true) {
            this.setState({
                modal: !this.state.modal,
                scopedDescription: this.props.description
            });
        }
        this.setState({
            modal: !this.state.modal
        });
    }

    restoreOriginalDescription = () => {
        this.setState({
            scopedDescription: this.props.description
        });
    }

    toggleEditDescription = () => {
        this.setState({
            editDescription: !this.state.editDescription
        });
    }

    updateStateDescription = (e) => {
        this.setState({
            scopedDescription: e.target.value
        });
    }


    render() {
        const {
            description,
            title,
            completed,
            id,
            requestCardUpdate,
            children
        } = this.props;
        const descriptionBox = this.state.editDescription ? CardModalEditBody({
            onChange: this.updateStateDescription,
            requestCardUpdate: (form) => {
                requestCardUpdate(form, id);
            },
            description: this.state.scopedDescription,
            toggleEditDescription: this.toggleEditDescription,
            restoreOriginalDescriptionAndCloseEditMode: () => {
                this.restoreOriginalDescription();
                this.toggleEditDescription();
            }
        }) : CardModalBody({
            description: this.state.scopedDescription,
            toggleEditDescription: this.toggleEditDescription
        });


        return (
            <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          {descriptionBox}
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => requestCardUpdate({completed: !completed}, id)}>{completed ? "Completed" : "In progress"}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
        );
    }
}






// const mapDispatchToProps = {
//     cardToggleSuccess
// };
function mapDispatchToProps(dispatch) {
    return {
        requestCardUpdate: (form, cardId) => {
            let token = localStorage.getItem('token');
            dispatch(requestCardUpdate(form, token, cardId));
        }
    };
}


export default connect(null, mapDispatchToProps)(CardModal);
