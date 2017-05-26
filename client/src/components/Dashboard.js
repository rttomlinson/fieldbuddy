import React from 'react'
import NewBoardForm from '../components/NewBoardForm';
import BoardSelector from '../components/BoardSelector';
import { Col, Row } from 'reactstrap';
import Card from './Card';
import List from './List';
import NewListForm from './NewListForm';


function showCurrentlySelectedListsOfBoard(currentBoard) {
    return currentBoard.Lists.map((list) => {
        return (
            <Col md={6} key={list.id}>
                <List {...list} boardId={currentBoard.id}/>
            </Col>
        );
    });
}  




const Dashboard = ({boards, currentBoard}) => {
    return (
        <div className="container">
            <NewBoardForm buttonLabel={"+Board"} />
            <BoardSelector boards={boards}/>
            <NewListForm buttonLabel={"Add new list"} boardId={currentBoard.id}></NewListForm>

            <Row>
                {showCurrentlySelectedListsOfBoard(currentBoard)}
            </Row>
        </div>   
    );
};

export default Dashboard;