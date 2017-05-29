import React from 'react'
import { Col, Row, Button } from 'reactstrap';
import List from './List';
import NewListForm from './NewListForm';
import DashboardNav from './DashboardNav';
import {Link} from 'react-router-dom';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';
import BoardPermissions from './BoardPermissions';

//<List {...list} boardId={currentBoard.id}/>
function showListsOfCurrentlySelectedBoard(currentBoard) {
    return currentBoard.Lists.map((list) => {
        return (
            <Col xs={12} md={6} key={list.id}>
                <Link to={`/dashboard/boards/${list.board_id}/lists/${list.id}`}>
                    <Card>
                        <CardBlock>
                          <CardTitle>List: {list.name}</CardTitle>
                          <CardSubtitle>List subtitle</CardSubtitle>
                          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        </CardBlock>
                      </Card>
                </Link>
            </Col>
        );
    });
}  





const Dashboard = ({boards, currentBoard, requestBoardRemoval, users}) => {
    console.log("currentBoard", currentBoard);
    return (
        <div className="container">
            <DashboardNav boards={boards} requestBoardRemoval={requestBoardRemoval}/>
            <NewListForm buttonLabel={"Add new list"} boardId={currentBoard.id}></NewListForm>
            <BoardPermissions currentBoard={currentBoard} users={users} buttonLabel="Manage Permissions"/>
            
            <Row>
                {showListsOfCurrentlySelectedBoard(currentBoard)}
            </Row>
        </div>   
    );
};

export default Dashboard;