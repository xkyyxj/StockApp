import Immutable from 'immutable'
import { ActionType } from '../../constant'

const initState = Immutable.Map({userId: '', token: ''})
export default function(state = initState, action) {
    let newState = state
    if(action.type == ActionType.LOGIN_SUCCESS) {
        newState = newState.set('token', action.payload.token)
        newState = newState.set('userId', action.payload.userId)
    }
    return newState
}