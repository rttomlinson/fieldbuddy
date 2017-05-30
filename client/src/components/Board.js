import React from 'react';

import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const Board = (props) => {
    const { name, id } = props;
  return (
      <Card>
        <Link to={`/dashboard/boards/${id}`}>
            <CardBlock>
              <CardTitle>Board: {name}</CardTitle>
              <CardSubtitle>board subtitle</CardSubtitle>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            </CardBlock>
        </Link>
      </Card>
  );
};

export default Board;


