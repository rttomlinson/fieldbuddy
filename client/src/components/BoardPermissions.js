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
import serialize from 'form-serialize';


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
            buttonLabel,
            requestAddBoardmember,
            requestRemoveBoardmember
        } = this.props;
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>{buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Manage Board Permissions</ModalHeader>
                    <ModalBody>
                        {generateAuthorizedUsers(currentBoard.Boardmembers, requestRemoveBoardmember)}
                        {generateAvailableUsers(users, currentBoard, requestAddBoardmember)}
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


function generateAuthorizedUsers(boardMembers, requestRemoveBoardmember) {
    return boardMembers.map((boardMember) => {
        return (
            <div key={boardMember.member_id}>
                <input  type="text" disabled={true} value={boardMember.User.username}/>{" "}
                <Button outline color="danger" size="sm" onClick={() => requestRemoveBoardmember(boardMember.board_id, boardMember.member_id)}>X</Button>
            </div>
        );
    });
}

function generateAvailableUsers(allUsers, currentBoard, requestAddBoardmember) {
    let authorizedUsers = currentBoard.Boardmembers;
    let boardId = currentBoard.id;
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
        <Form id="user-permissions-add" onSubmit={(e) => {
            e.preventDefault();
            let form = serialize(e.target, {hash:true});
            let memberId = form.memberId;
            requestAddBoardmember(boardId, memberId);
            console.log("form submitted");
        }}>
            <FormGroup>
              <Label for="memberId">Add a user to the board</Label>
              <Input type="select" name="memberId" id="memberId">
                {optionsGenerator(unauthorizedUsers)}
              </Input>
            </FormGroup>
            <Button form="user-permissions-add" type="submit">Authorize User</Button>
        </Form>
    );
}
