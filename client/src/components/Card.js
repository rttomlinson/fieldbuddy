import React from 'react';

import {
    Card,
    CardText,
    CardBlock,
    CardTitle,
    CardSubtitle
}
from 'reactstrap';
import CardModal from './CardModal';
import AuthorizedUsers from './AuthorizedUsers';

const statusMessage = (completed) => {
    return completed ? (<span style={{color: "green"}}>Completed</span>) : (<span style={{color:"red"}}>In progress</span>);
};



const StrapCard = (props) => {
    const {
        card,
        currentBoard
    } = props;
    console.log("card is now from card component", card);
    return (
        <Card>
        <CardBlock>
          <CardTitle>Entry: {new Date(card.createdAt).toDateString()}</CardTitle>
          <CardSubtitle>{statusMessage(card.completed)}</CardSubtitle>
          <CardModal buttonLabel="Open" {...card}>
            <AuthorizedUsers members={card.Cardmembers} requestRemoval={() => console.log("not yet wired up")}/>
          </CardModal>
        </CardBlock>
        <CardBlock>
        </CardBlock>
      </Card>
    );
};

export default StrapCard;
