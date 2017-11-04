import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../module/reducers';
import logger from 'redux-logger'

const middlewares = [thunk]
    //  middlewares.push(logger);
const enhancer = applyMiddleware(...middlewares);

const storestate = (inititalState) => {
    return createStore(rootReducer, inititalState, enhancer);
};

export default storestate;