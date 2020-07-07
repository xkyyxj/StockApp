import Immutable from 'immutable'
import { ActionType } from '../../../constant'

const initState = Immutable.Map({currTab: ''})

export default function(state = initState, action) {
    return state
}