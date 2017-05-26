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
import {withRouter} from 'react-router-dom';
import RequireAuthContainer from './RequireAuthContainer';
import Dashboard from '../components/Dashboard';



class DashboardContainer extends Component {

    componentDidMount() {
        console.log("dashboard did mount");
        //fetch initial data
        this.props.fetchBoards();
    }
    
    
    render() {
        const {boards, currentBoard } = this.props;
        if (boards.length === 0){
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
        currentBoard: state.boards.data.find((board) => {
            return board.id == ownProps.match.params.id;
        })
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards());
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
