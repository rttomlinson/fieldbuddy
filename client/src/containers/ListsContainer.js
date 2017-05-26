import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
import {fetchLists} from '../actions/ListsActions';
import Task from '../components/Task';
import {
    CardDeck,
    Row
}
from 'reactstrap';
import NewListForm from '../components/NewListForm';
import {withRouter} from 'react-router-dom';



const makeTasks = (tasks) => {
    return tasks.map((task) => {
        return (
            <Task key={task.id} {...task}/>
        );
    });

};

class ListsContainer extends Component {

    componentDidMount() {
        console.log("dashboard did mount");
        //fetch initial data
        this.props.fetchLists();
    }
    
    
    render() {
        const {lists, selectedList } = this.props;
        console.log("boards, and selectedBoard", lists, "selected", selectedList);
        return (
            <div className="container">
                <NewListForm buttonLabel="+Add List"/>
                <Row>
                    <CardDeck>
                        {makeTasks(selectedList ? selectedList.Tasks : [])}
                    </CardDeck>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    
    return {
        lists: state.lists.data,
        selectedList: state.lists.data.find((list) => {
            return list.id == ownProps.match.params.id;
        })
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLists: () => {
            dispatch(fetchLists());
        }
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListsContainer));