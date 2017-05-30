import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
import { requestAddBoardmember, requestRemoveBoardmember} from '../actions/boardsActions';
import {withRouter} from 'react-router-dom';
import RequireAuthContainer from './RequireAuthContainer';
import BoardPermissions from '../components/BoardPermissions';
import {
    Row,
    Col
}
from 'reactstrap';
import DashboardContainer from './DashboardContainer';
import NewListForm from '../components/NewListForm';
import ShortList from '../components/ShortList';


const makeLists = (lists) => {
    return lists.map((list) => {
        return (
            <Col key={list.id} xs={12} sm={6} md={6}> 
                <ShortList {...list}/>
            </Col>
        );
    });

};

class BoardContainer extends Component {

    componentDidMount() {
        console.log("boardcontainer did mount!!!!");
    }
    
    
    render() {
        const {
            boards,
            currentBoard,
            users,
            requestAddBoardmember,
            requestRemoveBoardmember
        } = this.props;
        if (boards.length === 0) {
            console.log("empty board list, probably needs to load");
            return null;
        }
        return (
            <Row>
                <Col xs={12}> 
                    <NewListForm buttonLabel={"Add new list"} boardId={currentBoard.id}></NewListForm>
                    <BoardPermissions requestAddBoardmember={requestAddBoardmember} requestRemoveBoardmember={requestRemoveBoardmember} currentBoard={currentBoard} users={users} buttonLabel="Manage Permissions"/>
                </Col>
                {makeLists(currentBoard.Lists)}
            </Row>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        boards: state.boards.data,
        users: state.users.data,
        currentBoard: state.boards.data.find((board) => {
            return board.id == ownProps.match.params.boardId;
        })
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        requestRemoveBoardmember: (boardId, memberId) => {
            dispatch(requestRemoveBoardmember(boardId, memberId));
        },
        requestAddBoardmember: (boardId, memberId) => {
            dispatch(requestAddBoardmember(boardId, memberId));
        }
    };
}



const WrappedBoardContainer = () => {
    return (
        <RequireAuthContainer>
            <DashboardContainer>
                <WiredBoardContainer />
            </DashboardContainer>
        </RequireAuthContainer>
    );
};

let WiredBoardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardContainer));
export default WrappedBoardContainer;
