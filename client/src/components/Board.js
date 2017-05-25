import React from 'react';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';

const Board = ({title, updatedAt}) => {
  return (
    <Col sm="4">
      <Card block>
        <CardBlock>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>Last update at: {updatedAt}</CardSubtitle>
          <CardText>Description Placeholder</CardText>
          <Button>Add List</Button>
        </CardBlock>
      </Card>
    </Col>
  );
};

export default Board;