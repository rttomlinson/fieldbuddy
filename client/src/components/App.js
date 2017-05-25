import React, {
    Component
}
from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
}
from 'react-router-dom';
import DashboardContainer from '../containers/DashboardContainer';
import LoginForm from './LoginForm';
import RequireAuthContainer from '../containers/RequireAuthContainer';
import Navbar from './Navbar';
import { authorizeUser } from '../actions/authActions';
import {connect} from 'react-redux';

class App extends Component {
    
    constructor(props){
        super(props);
        
        if(localStorage.getItem('token')) {
            this.props.authorizeUser();
        }

    }
    render() {
        return (
                <Router>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route path="/login" component={LoginForm} />
                            <Redirect exact from="/" to="/dashboard"/>
                            <RequireAuthContainer>
                                <Route path="/dashboard" component={DashboardContainer}/>
                            </RequireAuthContainer>
                            <Route render={() => {
                                    return (<div>Page not found</div>);
                            }} />
                        </Switch>
                    </div>
                </Router>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        authorizeUser: () => {
            dispatch(authorizeUser());
        }
    };
}


export default connect(null, mapDispatchToProps)(App);
