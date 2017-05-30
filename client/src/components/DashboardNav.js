import React from 'react';
import NewBoardForm from './NewBoardForm';
import BoardSelector from './BoardSelector';
import {Nav, NavItem, Button} from 'reactstrap';
import { requestBoardRemoval } from '../actions/boardsActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    requestBoardCreation
}
from '../actions/boardsActions';
import serialize from 'form-serialize';

const DashboardNav = ({boards, requestBoardRemoval, currentBoard, requestBoardCreation}) => {
    return (
        <Nav className="flex-space-between">
            <NavItem>
                Current board: {currentBoard ? currentBoard.name : "Choose a board!"}
            </NavItem>
            <NavItem>
                <BoardSelector boards={boards}/>
                <Nav>
                    <NavItem>
                        <NewBoardForm onSubmit={requestBoardCreation} buttonLabel={"+Board"} />
                    </NavItem>
                    <NavItem>
                        <Button disabled={currentBoard ? false : true} onClick={requestBoardRemoval}>Delete board</Button>
                    </NavItem>
                </Nav>
            </NavItem>
        </Nav>
    );
};

function mapStateToProps(state, ownProps) {

    return {
        // boards: state.boards.data,
        currentBoard: state.boards.data.find((board) => {
            return board.id == ownProps.match.params.boardId;
        })
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        requestBoardRemoval: () => {
            let token = localStorage.getItem('token');
            dispatch(requestBoardRemoval(ownProps.match.params.boardId, token));
            ownProps.history.replace('/dashboard/boards');
        },
        requestBoardCreation: (e) => {
            e.preventDefault();
            const form = serialize(e.target, {
                hash: true
            });
            dispatch(requestBoardCreation(form));
        }
    };
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardNav));