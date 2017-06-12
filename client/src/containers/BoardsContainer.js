import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
import {
    Row,
    Col
}
from 'reactstrap';

import {
    withRouter
}
from 'react-router-dom';
import Board from '../components/Board';
import RequireAuthContainer from './RequireAuthContainer';
import DashboardContainer from './DashboardContainer';
// import { requestAddBoardmember, requestRemoveBoardmember} from '../actions/boardsActions';



const makeBoards = (boards) => {
    return boards.map((board) => {
        return (
            <Col key={board.id} xs={12} sm={6} md={4}> 
                <Board {...board}/>
            </Col>
        );
    });

};

class BoardsContainer extends Component {

    componentDidMount() {
        console.log("boardscontainer did mount");
    }


    render() {
        const {
            boards
        } = this.props;
        if (boards.length === 0) {
            console.log("empty board list, probably needs to load");
            return null;
        }
        return (
            <Row>
                {makeBoards(boards)}
            </Row>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        boards: state.boards.data
    };
}

const WrappedBoardsContainer = () => {
    return (
        <RequireAuthContainer>
            <DashboardContainer>
                <WiredBoardsContainer />
            </DashboardContainer>
        </RequireAuthContainer>
    );
};

let WiredBoardsContainer = withRouter(connect(mapStateToProps)(BoardsContainer));
export default WrappedBoardsContainer;
