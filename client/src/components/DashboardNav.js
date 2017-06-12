import React from 'react';
import NewBoardForm from './NewBoardForm';
import BoardSelector from './BoardSelector';
import {
    Nav,
    NavItem,
    Button
}
from 'reactstrap';
import {
    requestBoardRemoval
}
from '../actions/boardsActions';
import {
    connect
}
from 'react-redux';
import {
    withRouter,
    Link
}
from 'react-router-dom';
import {
    requestBoardCreation
}
from '../actions/boardsActions';
import serialize from 'form-serialize';
import * as helpers from '../helpers';


function getCrumbs(entities) {
    //if location for "boards" is undefined, we are at the boards page
    if (!entities[0][1]) {
        return "Pick an observation site";
    }
    return entities.map((entity) => {
        //for each entity, walk through all the entities until the current entity
        let fullLink = '/dashboard';
        let index = 0;
        while(entities[index][0] !== entity[0]) {
            fullLink = fullLink + '/' + entities[index][0] + '/' + entities[index][1];
            ++index;
        }
        fullLink = fullLink + '/' + entity[0] + '/' + entity[1];
        return <Link key={fullLink} to={fullLink}>{entities[index][0]}{" -> "}</Link>;
    });
    
}

const DashboardNav = ({
    boards,
    requestBoardRemoval,
    currentBoard,
    currentList,
    requestBoardCreation,
    locationArray
}) => {

    return (
        <Nav className="flex-space-between">
            <NavItem className="flex flex-align-middle">
                <p style={{fontSize: 24}}>
                    <span>{getCrumbs(locationArray)}</span>
                </p>
            </NavItem>
            <NavItem>
                <BoardSelector boards={boards}/>
                <Nav>
                    <NavItem>
                        <NewBoardForm onSubmit={requestBoardCreation} buttonLabel={"+New site"} />
                    </NavItem>
                    <NavItem>
                        <Button disabled={currentBoard ? false : true} onClick={requestBoardRemoval}>Delete site</Button>
                    </NavItem>
                </Nav>
            </NavItem>
        </Nav>
    );
};

function mapStateToProps(state, ownProps) {
    
    let locationArray = getLocationArray(ownProps.location.pathname);
    return {
        locationArray,
        currentBoard: state.boards.data.find((board) => {
            return board.id == ownProps.match.params.boardId;
        }),
        currentList: helpers.findListByListId(ownProps.match.params.listId, state.boards.data)
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


function getLocationArray(pathname) {
    //if trailing / trim
    if (pathname.charAt(pathname.length - 1) === '/') {
        pathname = pathname.slice(0, pathname.length - 1);
    }
    //remove leading dashboard and /
    let dashIndex = pathname.indexOf('dashboard/');
    pathname = pathname.slice((dashIndex + 10));
    //chunk at /
    let pairs = pathname.split('/');
    let locationArray = [];
    for (let i = 0; i < pairs.length; i+=2) {
        locationArray.push([pairs[i], pairs[i+1]]);
    }
    return locationArray;
    
}