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
import LoginForm from './LoginForm';
import BoardsContainer from '../containers/BoardsContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ListsContainer from '../containers/ListsContainer';
import Navbar from './Navbar';



class App extends Component {
    
    render() {
        console.log("rendering app");
        return (
                <Router>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route path="/login" component={LoginForm} />
                            <Redirect exact from="/" to="/dashboard/boards/1"/>
                            <Route path="/dashboard/boards/:id" component={DashboardContainer}/>
                            <Redirect exact from="/dashboard/boards" to="/dashboard/boards/1"/>
                            <Route path="/dashboard/lists/:id" component={ListsContainer}/>
                            <Route render={() => {
                                    return (<div>Page not found</div>);
                            }} />
                        </Switch>
                    </div>
                </Router>
        );
    }
}

export default App;
