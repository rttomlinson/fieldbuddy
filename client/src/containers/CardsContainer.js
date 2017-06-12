import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
import Card from '../components/Card';
import {
    CardDeck,
    Row,
    Col
}
from 'reactstrap';
// import {withRouter} from 'react-router-dom';


class CardsWrapper extends Component {

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
//         currentBoard: (selectedCard ? selectedCard.boardId : null)
        
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
export default CardsWrapper;