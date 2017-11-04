import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import storesstate from './redux/store/storestate';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routers';
import registerServiceWorker from './registerServiceWorker';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const store = storesstate();
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {getRoutes(store)}
        </Router>
    </Provider>,
    document.getElementById("root")
)
registerServiceWorker();