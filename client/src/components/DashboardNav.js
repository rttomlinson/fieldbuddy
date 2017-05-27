import React from 'react';
import NewBoardForm from './NewBoardForm';
import BoardSelector from './BoardSelector';
import {Nav, NavItem, Button} from 'reactstrap';

const DashboardNav = ({boards}) => {
    return (
        <Nav className="flex-space-between">
            <NavItem>
                Current board: 
            </NavItem>
            <NavItem>
                <BoardSelector boards={boards}/>
                <Nav>
                    <NavItem>
                        <NewBoardForm buttonLabel={"+Board"} />
                    </NavItem>
                    <NavItem>
                        <Button onClick={()=>console.log("dispatch request to delete board and associated lists etc")}>Delete board</Button>
                    </NavItem>
                </Nav>
            </NavItem>
        </Nav>
    );
};

export default DashboardNav;