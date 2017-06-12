import React from 'react';

import { Card, CardBlock,
  CardTitle, Button } from 'reactstrap';
import NewCardForm from './NewCardForm';
import CardCard from './Card';


function makeCards(cards, currentBoard) {
    return cards.map(card => {
        return (
            <CardCard key={card.id} card={card} currentBoard={currentBoard}/>
        );
    });
}






const List = (props) => {
    const { style, Cards, boardId, name, children, id, currentBoard } = props;
  return (
      <Card style={style}>
        <CardBlock>
          <CardTitle>Animal: {name}</CardTitle>
          <NewCardForm buttonLabel="Add new entry" listId={id}/>
          <Button onClick={() => {console.log("List deletion not yet implemented")}}>Delete this list</Button>
        </CardBlock>
        <CardBlock>
            {makeCards(Cards, currentBoard)}
        </CardBlock>
      </Card>
  );
};

export default List;


