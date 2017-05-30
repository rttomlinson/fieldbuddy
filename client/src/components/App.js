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
import BoardContainer from '../containers/BoardContainer';
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
                            <Redirect exact from="/" to="/dashboard/boards"/>
                            <Route path="/dashboard/boards/:boardId/lists/:listId" component={ListsContainer}/>
                            <Route path="/dashboard/boards/:boardId" component={BoardContainer}/>
                            <Route exact path="/dashboard/boards" component={BoardsContainer}/>
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
