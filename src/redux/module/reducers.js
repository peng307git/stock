import { combineReducers } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';
import trade from './trade'
import basis from './basis'
import ranking from './ranking'

const rootReducer = combineReducers({
    notifs: notifReducer,
    trade,
    basis,
    ranking

})

export default rootReducer;