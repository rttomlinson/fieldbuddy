import React from 'react'
import { Col, Row } from 'reactstrap';
import List from './List';
import NewListForm from './NewListForm';
import DashboardNav from './DashboardNav';
import {Link} from 'react-router-dom';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';


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




const Dashboard = ({boards, currentBoard}) => {
    return (
        <div className="container">
            <DashboardNav boards={boards}/>
            <NewListForm buttonLabel={"Add new list"} boardId={currentBoard.id}></NewListForm>
            <Row>
                {showListsOfCurrentlySelectedBoard(currentBoard)}
            </Row>
        </div>   
    );
};

export default Dashboard;