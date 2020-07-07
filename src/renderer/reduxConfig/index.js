import * as reducers from './reducerItems'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable'
import reducerItems from './reducerItems'
import thunk from 'redux-thunk'

const initialState = Immutable.Map()

export default function() {
    return createStore(combineReducers(reducerItems), initialState, applyMiddleware(thunk))
}
