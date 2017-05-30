import React from 'react';

import { Card, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';


const statusMessage = (completed) => {
    return completed ? (<span style={{color: "green"}}>Completed</span>) : (<span style={{color:"red"}}>In progress</span>);
};



const ShortCard = (props) => {
    const { card } = props;
  return (
      <Card>
        <CardBlock>
          <CardTitle>Card: {card.title}</CardTitle>
          <CardSubtitle>{statusMessage(card.completed)}</CardSubtitle>
        </CardBlock>
      </Card>
  );
};

export default ShortCard;


