import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
// import {fetchCards} from '../actions/listsActions';
import Card from '../components/Card';
import {
    CardDeck,
    Row,
    Col
}
from 'reactstrap';
import NewCardForm from '../components/NewCardForm';
// import {withRouter} from 'react-router-dom';

const makeCards = (cards) => {
    return cards.map((list) => {
        return (
            <Row key={list.id}>
                <Col>
                    <Card  {...list}/>
                </Col>
            </Row>
        );
    });
};



class CardsContainer extends Component {

    // componentDidMount() {
    //     console.log("dashboard did mount");
    //     //fetch initial data
    //     this.props.fetchCards();
    // }
    
    
    render() {
        const { cards } = this.props;
        console.log("cards, and selectedCard", cards );
        return (
            <div>
                {makeCards(cards)}
            </div>
        );
    }
}

// function mapStateToProps(state, ownProps) {
//     const selectedCard = state.cards.data.find((list) => {
//             return list.id == ownProps.match.params.id;
//         });
//     return {
//         cards: state.cards.data,
//         selectedCard,
//         currentBoard: (selectedCard ? selectedCard.board_id : null)
        
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         fetchCards: () => {
//             dispatch(fetchCards());
//         }
//     };
// }


// export default withRouter(connect(null, mapDispatchToProps)(CardsContainer));
export default CardsContainer;