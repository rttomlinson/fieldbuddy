import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import authReducer from './reducers/authReducer';
import boardsReducer from './reducers/boardsReducer';

const store = createStore(combineReducers({auth: authReducer, boards: boardsReducer}), applyMiddleware(thunk));
let unsubscribe = store.subscribe(() => {
    console.log("current store state", store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
