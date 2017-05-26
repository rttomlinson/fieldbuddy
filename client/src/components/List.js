import React from 'react';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import {Link} from 'react-router-dom';

const List = ({name, updatedAt, id}) => {
  return (
        <Col sm="4">
            <Link to={`/dashboard/lists/${id}`}>
                  <Card block>
                    <CardBlock>
                      <CardTitle>{name}</CardTitle>
                      <CardSubtitle>Last update at: {updatedAt}List</CardSubtitle>
                      <CardText>Description Placeholder</CardText>
                    </CardBlock>
                  </Card>
            </Link>
        </Col>
  );
};

export default List;