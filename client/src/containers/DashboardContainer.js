import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
import {fetchBoards} from '../actions/boardsActions';
import Board from '../components/Board';
import {
    CardDeck,
    Row
}
from 'reactstrap';


const makeBoards = (boards) => {
    return boards.map((board) => {
        return (
            <Board key={board.id} title={board.name} updatedAt={board.updatedAt}/>
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
        const {boards} = this.props;
        console.log("expect boards to be updated", boards);
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
        fetchBoards: () => {
            dispatch(fetchBoards());
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
