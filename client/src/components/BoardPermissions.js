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
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';



class BoardPermissions extends React.Component {
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
            currentBoard,
            users,
            buttonLabel
        } = this.props;
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>{buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Manage Board Permissions</ModalHeader>
                    <ModalBody>
                        {generateAuthorizedUsers(currentBoard.Boardmembers)}
                        {generateAvailableUsers(users, currentBoard.Boardmembers)}
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default BoardPermissions;


function generateAuthorizedUsers(boardMembers) {
    return boardMembers.map((boardMember) => {
        return (
            <div key={boardMember.member_id}>
                <input  type="text" disabled={true} value={boardMember.User.username}/>{" "}
                <Button outline color="danger" size="sm">X</Button>
            </div>
        );
    });
}

function generateAvailableUsers(allUsers, authorizedUsers) {
    //filter through the users to get the remaining ones
    let authorizedUsersIds = authorizedUsers.reduce((acc, user) => {
        acc.push(user.member_id);
        return acc;
    }, []);
    let unauthorizedUsers = allUsers.filter((user) => {
        return !authorizedUsersIds.includes(user.id);
    });
    let optionsGenerator = (users) => {
        return users.map((user) => {
            return (<option key={user.id} value={user.id}>{user.username}</option>);
        });
    };
    
    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            console.log("form submitted");
        }}>
            <FormGroup>
              <Label for="boardPermission">Add a user to the board</Label>
              <Input type="select" name="boardPermission" id="boardPermission">
                {optionsGenerator(unauthorizedUsers)}
              </Input>
            </FormGroup>
        </Form>
    );
}
