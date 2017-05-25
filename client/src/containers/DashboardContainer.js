import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import serialize from 'form-serialize';
import {
    connect
}
from 'react-redux';
import {
    requestBoardCreation
}
from '../actions/submitNewBoardsActions';
import fetchBoards from '../actions/boardsActions';
import Board from '../components/Board';
import {
    CardDeck,
    Row
}
from 'reactstrap';


const makeBoards = (boards) => {
    return boards.map((board) => {
        return (
            <Board title={board.name} updatedAt={board.updatedAt}/>
        );
    });

};


class DashboardContainer extends Component {

    componentDidMount() {
        console.log("dashboard did mount");
        //fetch initial data
        this.props.fetchBoards();
    }
    render() {
        return (
            <div className="container">
                <Row>
                    <CardDeck>
                        {makeBoards(this.props.boards)}
                    </CardDeck>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boards.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestBoardCreation: (e) => {
            console.log("form submitted for board creation!");
            e.preventDefault();
            let form = serialize(e.target, {
                hash: true
            });
            dispatch(requestBoardCreation(form));
        },
        fetchBoards: () => {
            dispatch(fetchBoards());
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
