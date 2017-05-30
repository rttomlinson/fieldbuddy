import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {
    Provider
}
from 'react-redux';

import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
}
from 'redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import authReducer from './reducers/authReducer';
import boardsReducer from './reducers/boardsReducer';
import listsReducer from './reducers/listsReducer';
import usersReducer from './reducers/usersReducer';


let createStoreEnhancers;
if (process.env.NODE_ENV === 'production') {
    createStoreEnhancers = applyMiddleware(thunk);
}
else {
    createStoreEnhancers = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}



const store = createStore(combineReducers({
    auth: authReducer,
    boards: boardsReducer,
    users: usersReducer
}), createStoreEnhancers);
let unsubscribe = store.subscribe(() => {
    console.log("current store state", store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
