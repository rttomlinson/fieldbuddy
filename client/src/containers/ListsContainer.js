import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
// import {fetchLists} from '../actions/listsActions';
import Card from '../components/Card';
import {
    CardDeck,
    Row,
    Col
}
from 'reactstrap';
import List from '../components/List';
import NewListForm from '../components/NewListForm';
// import {withRouter} from 'react-router-dom';

// const makeCards = (cards) => {
//     return cards.map((card) => {
//         return (
//             <Card key={card.id} {...card}/>
//         );
//     });

// };


const makeLists = (lists) => {
    return lists.map((list) => {
        return (
            <Row key={list.id}>
                <Col>
                    <List  {...list}/>
                </Col>
            </Row>
        );
    });

};



class ListsContainer extends Component {

    // componentDidMount() {
    //     console.log("dashboard did mount");
    //     //fetch initial data
    //     this.props.fetchLists();
    // }
    
    
    render() {
        const { lists } = this.props;
        console.log("lists, and selectedList", lists );
        return (
            <Row>
                <Col xs={12}>
                    <NewListForm boardId={1} buttonLabel="+Add List"/>
                </Col>
                <Col xs={12}>
                    {makeLists(lists)}
                </Col>
            </Row>
        );
    }
}

// function mapStateToProps(state, ownProps) {
//     const selectedList = state.lists.data.find((list) => {
//             return list.id == ownProps.match.params.id;
//         });
//     return {
//         lists: state.lists.data,
//         selectedList,
//         currentBoard: (selectedList ? selectedList.board_id : null)
        
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         fetchLists: () => {
//             dispatch(fetchLists());
//         }
//     };
// }


// export default withRouter(connect(null, mapDispatchToProps)(ListsContainer));
export default ListsContainer;