import React from 'react';

import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

const Board = (props) => {
    const { name, id, description } = props;
  return (
      <Card className="boardBoxes">
        <NavLink to={`/dashboard/boards/${id}`}>
            <CardBlock>
              <CardSubtitle>{name}</CardSubtitle>
            </CardBlock>
        </NavLink>
      </Card>
  );
};

export default Board;


