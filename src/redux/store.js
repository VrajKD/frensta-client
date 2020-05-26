import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import userReducer from '../redux/reducers/userReducer'
import UIReducer from '../redux/reducers/UIReducer'
import dataReducer from '../redux/reducers/dataReducer'

const INITIAL_STATE = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    UI: UIReducer,
    data: dataReducer
});

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, INITIAL_STATE, enhancer);

export default store;