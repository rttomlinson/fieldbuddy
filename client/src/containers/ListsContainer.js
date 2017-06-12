import React, {
    Component
}
from 'react';
import {
    connect
}
from 'react-redux';
import {
    withRouter,
    NavLink
}
from 'react-router-dom';
import RequireAuthContainer from './RequireAuthContainer';
import {
    findListByListId
}
from '../helpers';
import List from '../components/List';
import DashboardContainer from './DashboardContainer';
import serialize from 'form-serialize';
import {
    requestCardCreation
}
from '../actions/boardsActions';

class ListsContainer extends Component {

    componentDidMount() {
        console.log("listsContainer did mount");
    }

    render() {
        const {
            selectedList,
            currentBoard
        } = this.props;
        if (selectedList === -1) {
            return (
                <div>
                    <p>Hmm...looks like there isn't a list by that name. Trying going back to the board and selected something else.</p>
                    <NavLink to={`/dashboard/boards/${currentBoard.id}`}>Back to the board</NavLink>
                </div>
            );
        }
        if (selectedList === -2) {
            return (
                <div>
                    <p>It's probably still loading</p>
                    <NavLink to="/dashboard">Click here to go back to the rest of your boards</NavLink>
                </div>
            );
        }
        return (
            <List style={{marginTop: 10}} Cards={selectedList.Cards} currentBoard={currentBoard} name={selectedList.name} id={selectedList.id} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const selectedList = findListByListId(ownProps.match.params.listId, state.boards.data);
    return {
        boards: state.boards.data,
        currentBoard: state.boards.data.find((board) => {
            return board.id == ownProps.match.params.boardId;
        }),
        selectedList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestCardCreation: (e) => {
            e.preventDefault();
            const form = serialize(e.target, {
                hash: true
            });
            dispatch(requestCardCreation(form));
        }
    };
}

const WrappedListsContainer = () => {
    return (
        <RequireAuthContainer>
            <DashboardContainer>
                <WiredListsContainer />
            </DashboardContainer>
        </RequireAuthContainer>
    );
};

let WiredListsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ListsContainer));
export default WrappedListsContainer;
