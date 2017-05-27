import React, {
    Component
}
from 'react';
import {
    connect
}
from 'react-redux';
import Card from '../components/Card';
import {withRouter, NavLink} from 'react-router-dom';
import RequireAuthContainer from './RequireAuthContainer';
import { findListByListId } from '../helpers';
import {fetchBoards} from '../actions/boardsActions';
import List from '../components/List';


const makeCards = (cards) => {
    return cards.map((card) => {
        return (
            <Card key={card.id} {...card}/>
        );
    });

};

class ListsContainer extends Component {

    componentDidMount() {
        console.log("list did mount");
        //check to see if data has been fetched or is fetching..?
        console.log("all props from state", this.props);
        if (this.props.boards.length === 0) {
            this.props.fetchBoards();
        }
    }
    
    
    render() {
        const { selectedList, boardId } = this.props;
        console.log("lists, and selectedList", selectedList );
        if (selectedList === -1) {
            return (
                <div>
                    <p>Hmm...looks like there isn't a list by that name. Trying going back to the board and selected something else.</p>
                    <NavLink to={`/dashboard/boards/${boardId}`}>Back to the board</NavLink>
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
            <List Cards={selectedList.Cards} name={selectedList.name} id={selectedList.id} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log("ownProps", ownProps, state);
    const selectedList = findListByListId(ownProps.match.params.listId, state.boards.data);
    return {
        boards: state.boards.data,
        selectedList,
        boardId: ownProps.match.params.boardId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards());
        }
    };
}




const WiredListsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ListsContainer));
const WrappedListsContainer = () => {
    return (
        <RequireAuthContainer>
            <WiredListsContainer />
        </RequireAuthContainer>
        
    );
};
export default WrappedListsContainer;
