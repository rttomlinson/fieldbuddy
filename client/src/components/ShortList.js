import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle, CardImg } from 'reactstrap';


const List = (props) => {
    const { boardId, name, id } = props;
    return (
        <Link to={`${boardId}/lists/${id}`}>
            <Card>
                <CardImg style={{padding: 10}}top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150" alt="Card image cap" />
                <CardBlock>
                    <CardSubtitle>Animal {name}</CardSubtitle>
                </CardBlock>
            </Card>
        </Link>
    );
};

export default List;


