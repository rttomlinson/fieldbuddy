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
import {fetchUsers} from '../actions/usersActions';
import {withRouter} from 'react-router-dom';
import Dashboard from '../components/Dashboard';

class DashboardContainer extends Component {

    componentDidMount() {
        console.log("dashboardcontainer did mount");
        //fetch initial data
        this.props.fetchUsers();
        this.props.fetchBoards();
    }
    
    render() {
        const {boards, users } = this.props;
        console.log("render dashboardcontainer");
        if (boards.length === 0 || users.length === 0){
            console.log("data needs to be fetched");
            return <div>Probably loading...</div>;
        }
        return (
            <Dashboard {...this.props}>
            </Dashboard>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        boards: state.boards.data,
        users: state.users.data
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards());
        },
        fetchUsers: () => {
            dispatch(fetchUsers());
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardContainer));