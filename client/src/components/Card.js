import React from 'react';

import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import CardModal from './CardModal';



const StrapCard = (props) => {
    const { card } = props;
  return (
      <Card>
        <CardBlock>
          <CardTitle>Card: {card.title}</CardTitle>
          <CardSubtitle>Card: subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <CardModal buttonLabel="Open" {...card}/>
        </CardBlock>
      </Card>
  );
};

export default StrapCard;


