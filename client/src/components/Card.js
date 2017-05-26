import React from 'react';

import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const StrapCard = (props) => {
    console.log("props", props);
    const { Cards, id, name } = props;
  return (
    <div>
      <Card>
        <CardBlock>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>List subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Add new card</Button>
        </CardBlock>
        <CardBlock>
            <Card>
                <CardBlock>
                  <CardTitle>Card name</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                </CardBlock>
            </Card>
        </CardBlock>
      </Card>
    </div>
  );
};

export default StrapCard;


