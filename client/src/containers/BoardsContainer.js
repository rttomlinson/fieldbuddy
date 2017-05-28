import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
import {fetchBoards} from '../actions/boardsActions';
import {
    CardDeck,
    Row
}
from 'reactstrap';
import NewBoardForm from '../components/NewBoardForm';
import BoardSelector from '../components/BoardSelector';
import {withRouter} from 'react-router-dom';
import Board from '../components/Board';
import RequireAuthContainer from './RequireAuthContainer';


const makeBoards = (boards) => {
    return boards.map((board) => {
        return (
            <Board key={board.id} {...board}/>
        );
    });

};

class BoardsContainer extends Component {

    componentDidMount() {
        console.log("dashboard did mount");
        //fetch initial data
        this.props.fetchBoards();
    }
    
    
    render() {
        const {boards, currentBoard } = this.props;
        if (boards.length === 0){
            console.log("empty board list, probably needs to load");
            return null;
        }
        return (
            <div className="container">
                <NewBoardForm buttonLabel="+Add board"/>
                <BoardSelector boards={boards} currentBoard={currentBoard}/>
                <Row>
                    {makeBoards(boards)}
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    
    return {
        boards: state.boards.data,
        currentBoard: state.boards.data.find((board) => {
            return board.id === ownProps.match.params.boardId;
        })
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards());
        }
    };
}


const WrappedBoardsContainer = () => {
    return(
        <RequireAuthContainer>
            <WiredBoardsContainer />
        </RequireAuthContainer>
    );
};

let WiredBoardsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardsContainer));
export default WrappedBoardsContainer; 
