import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';


const List = (props) => {
    const { board_id, name, id } = props;
    return (
        <Link to={`${board_id}/lists/${id}`}>
            <Card>
                <CardBlock>
                    <CardTitle>List: {name}</CardTitle>
                    <CardSubtitle>List subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                </CardBlock>
            </Card>
        </Link>
    );
};

export default List;


