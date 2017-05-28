/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {cardToggleSuccess} from '../actions/boardsActions';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux';


const CardModalBody = ({description, toggleEditDescription}) => {
    return (
        <ModalBody>
            {description}{" "}<a href="/" onClick={(e) => {
                e.preventDefault();
                toggleEditDescription();
                console.log("should change this so that we can edit the description");
            }}>Click here to edit the description</a>
          </ModalBody>
    );
};

const CardModalEditBody = ({description, toggleEditDescription, onChange}) => {
    return (
        <ModalBody>
            <Form>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="textarea" name="description" id="description" value={description} onChange={onChange}/>
                </FormGroup>
                <Button>Save changes</Button>
                <Button onClick={toggleEditDescription}>Cancel</Button>
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
          this.setState({
              scopedDescription : nextProps.description
          });
      }
  }
  

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  toggleEditDescription = () => {
      this.setState({
          editDescription: !this.state.editDescription
      });
  }
  
  updateStateDescription = (e) => {
      console.log("on input change", e);
      this.setState({
          scopedDescription: e.target.value
      });
  }
  

  render() {
      const { description, title, completed, id, cardToggleSuccess } = this.props;
      const descriptionBox = this.state.editDescription ? CardModalEditBody({ onChange: this.updateStateDescription, description: this.state.scopedDescription, toggleEditDescription: this.toggleEditDescription}) : CardModalBody({ description: this.state.scopedDescription, toggleEditDescription: this.toggleEditDescription})
      
      
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          {descriptionBox}
          <ModalFooter>
            <Button color="primary" onClick={() => cardToggleSuccess(id)}>{completed ? "Completed" : "In progress"}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}






const mapDispatchToProps = {
    cardToggleSuccess
};


export default connect(null, mapDispatchToProps)(CardModal);