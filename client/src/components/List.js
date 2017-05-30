import React from 'react';

import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import NewCardForm from './NewCardForm';
import CardCard from './Card';


function makeCards(cards) {
    return cards.map(card => {
        return (
            <CardCard key={card.id} card={card} />
        );
    });
}






const List = (props) => {
    const { Cards, boardId, name, children, id } = props;
  return (
      <Card>
        <CardBlock>
          <CardTitle>List: {name}</CardTitle>
          <CardSubtitle>List subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <NewCardForm buttonLabel="Add new card" listId={id}/>
          <Button onClick={() => {console.log("List deletion not yet implemented")}}>Delete this list</Button>
        </CardBlock>
        <CardBlock>
            {makeCards(Cards)}
        </CardBlock>
      </Card>
  );
};

export default List;


