import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    connect
}
from 'react-redux';
import {fetchBoards, requestBoardRemoval} from '../actions/boardsActions';
import {fetchUsers} from '../actions/usersActions';
import {withRouter} from 'react-router-dom';
import RequireAuthContainer from './RequireAuthContainer';
import Dashboard from '../components/Dashboard';



class DashboardContainer extends Component {

    componentDidMount() {
        console.log("dashboard did mount");
        //fetch initial data
        this.props.fetchUsers();
        this.props.fetchBoards();
    }
    
    
    render() {
        const {boards, currentBoard, users } = this.props;
        console.log("render dashboardcontainer");
        if (boards.length === 0 || users.length === 0){
            console.log("data needs to be fetched");
            return <div>Probably loading...</div>;
        }
        return (
            <Dashboard {...this.props}/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        boards: state.boards.data,
        users: state.users.data,
        currentBoard: state.boards.data.find((board) => {
            return board.id == ownProps.match.params.boardId;
        })
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards());
        },
        requestBoardRemoval: () => {
            let token = localStorage.getItem('token');
            dispatch(requestBoardRemoval(ownProps.match.params.boardId, token));
            ownProps.history.replace('/dashboard/boards');
        },
        fetchUsers: () => {
            dispatch(fetchUsers());
        }
    };
}



const WrappedDashboardContainer = () => {
    return(
        <RequireAuthContainer>
            <WiredDashboardContainer />
        </RequireAuthContainer>
    );
};

let WiredDashboardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardContainer));
export default WrappedDashboardContainer; 
