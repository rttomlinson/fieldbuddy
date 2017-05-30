import React from 'react';

import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';
import CardModal from './CardModal';


const statusMessage = (completed) => {
    return completed ? (<span style={{color: "green"}}>Completed</span>) : (<span style={{color:"red"}}>In progress</span>);
};



const StrapCard = (props) => {
    const { card } = props;
  return (
      <Card>
        <CardBlock>
          <CardTitle>Card: {card.title}</CardTitle>
          <CardSubtitle>{statusMessage(card.completed)}</CardSubtitle>
          <CardText>{card.description}</CardText>
          <CardModal buttonLabel="Open" {...card}/>
        </CardBlock>
      </Card>
  );
};

export default StrapCard;


