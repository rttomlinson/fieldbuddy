import React from 'react';

import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const StrapCard = (props) => {
    console.log("props", props);
    const { id, name, children } = props;
  return (
      <Card id={id}>
        <CardBlock>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>List subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Add new card</Button>
        </CardBlock>
        <CardBlock>
            {children}
        </CardBlock>
      </Card>
  );
};

export default StrapCard;


