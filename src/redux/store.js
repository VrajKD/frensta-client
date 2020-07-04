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

const store = createStore(reducers, INITIAL_STATE, applyMiddleware(middleware));

export default store;